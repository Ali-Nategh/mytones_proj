import {
    RedisFindRefreshToken, PrismaUserCreation, PrismaFindUserByEmail, PrismaFindOTP,
    RedisDeactivateRefreshToken, RedisCreateRefreshToken, PrismaFindEmail,
} from "../repositories/user.repository";
import { jwtRefreshGen, jwtAccessGen, refreshToken, jwtVerifyRefreshToken } from "../utils/jwtToken";
import { PrismaCreateUserFavorites } from "../repositories/music.repository";
import { logError, isOperationalError } from "../errors/errorHandler";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { Request, Response, NextFunction } from "express";
import { sendMail } from '../services/email.service';
import generateOTP from '../services/otp.service';
import { sendError } from "../errors/errorHandler";
import { authorizePass } from "../utils/authPass";
import hashPass from "../utils/hashPass";
import User from "../models/user";


export async function signUpUserService(req: Request, res: Response) {
    const hashedPassword = await hashPass(req.body.password);

    if (req.body.age) {
        const userAge = parseInt(req.body.age);
        if (userAge < 0 || userAge == NaN) return sendError(httpStatusCodes.BAD_REQUEST, "Age Is Invalid", res)
        req.body.age = userAge
    }

    const user = new User(req.body.username, req.body.name, req.body.lastname, req.body.email, hashedPassword, req.body.age);

    // Adding user to Database
    try {
        const emailExisting = await PrismaFindEmail(user.email)
        if (emailExisting) return sendError(httpStatusCodes.BAD_REQUEST, "Email Already Exists", res)

        const user_data = await createUser(user);
        console.log(user_data);

        const user_id = await PrismaFindUserByEmail(user.email)
        if (!user_id) return sendError(httpStatusCodes.INTERNAL_SERVER_ERROR, "User Not Found", res)

        const userOTP = await PrismaFindOTP(user_id.id)
        if (!userOTP) return sendError(httpStatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong sending password to email", res)

        sendMail({ to: user.email, OTP: userOTP.otp })
        return res.status(201).send("User Created Successfully");
    } catch (error) {
        console.error(error);
        sendError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong creating user', res)

        // if the Promise is rejected this will catch it
        process.on('unhandledRejection', error => {
            throw error
        })
        // Catch unexpected Exceptions
        process.on('uncaughtException', error => {
            logError(error);
            if (!isOperationalError(error)) {
                process.exit(1);
            }
        })
    };
};


export async function loginUserService(req: Request, res: Response) {
    let user = await PrismaFindUserByEmail(req.body.email);
    if (user == null) {
        return sendError(httpStatusCodes.BAD_REQUEST, 'Cannot find user', res)
    };

    const userEmail = await PrismaFindEmail(req.body.email)
    if (!userEmail?.verified) return sendError(httpStatusCodes.UNAUTHORIZED, "Email is not active", res)

    try {
        if (await authorizePass(req.body.password, user.password)) {
            const accessToken = jwtAccessGen(user.id)
            const refresh_token = await RedisCreateRefreshToken(jwtRefreshGen(user.id), user.id)
            console.log([accessToken, refresh_token]);

            await PrismaCreateUserFavorites(user.id)
            return res.status(200).json({ accessToken: accessToken, refresh_token: refresh_token.id });
        } else {
            return sendError(httpStatusCodes.UNAUTHORIZED, "Not Allowed", res)
        }
    } catch (err) {
        console.error(err);
        return sendError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong in user login', res)
    };
}


export async function logoutUserService(req: Request, res: Response) {
    const sentRefreshToken = req.body.token

    jwt.verify(sentRefreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: VerifyErrors | null, user_id: any) => {
        if (err) {
            return sendError(403, 'Token is invalid or has expired, please login again', res)
        }
        const refreshtoken = await RedisFindRefreshToken(user_id.id)
        if (!refreshtoken) return sendError(httpStatusCodes.UNAUTHORIZED, "Refresh token not found", res)

        await RedisDeactivateRefreshToken(user_id.id)
        return res.status(200).send("Logged out successfully");
    });
}


export async function refreshUserTokenService(req: Request, res: Response) {
    const sentRefreshToken = req.body.token;

    if (sentRefreshToken == null) return sendError(httpStatusCodes.BAD_REQUEST, "Please include a refresh token", res)

    jwt.verify(sentRefreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: VerifyErrors | null, user_id: any) => {
        if (err) {
            return sendError(403, 'Token is invalid or has expired, please login again', res)
        }
        const refreshtoken = await RedisFindRefreshToken(user_id.id)
        if (!refreshtoken) return sendError(httpStatusCodes.UNAUTHORIZED, "Refresh token is not active, please login", res)

        return refreshToken(sentRefreshToken, res);
    });
}

export async function createUser(user: User) {
    const user_data = await PrismaUserCreation(user.username, user.name, user.lastname, user.email, user.password, generateOTP(), user?.age);
    return user_data;
}
