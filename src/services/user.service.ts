import {
    RedisFindRefreshToken, PrismaUserCreation, PrismaFindUserByEmail, RedisFindOTP,
    RedisDeactivateRefreshToken, RedisCreateRefreshToken, PrismaFindEmail,
} from "../repositories/user.repository";
import { jwtRefreshGen, jwtAccessGen, refreshToken } from "../utils/jwtToken";
import { logError, isOperationalError } from "../errors/errorHandler";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { httpStatus } from "../errors/httpStatusCodes";
import { Request, Response, NextFunction } from "express";
import { sendMail } from '../services/email.service';
import generateOTP from '../services/otp.service';
import { sendError } from "../errors/errorHandler";
import { authorizePass } from "../utils/authPass";
import Api400Error from "../errors/api400Error";
import Api401Error from "../errors/api401Error";
import Api403Error from "../errors/api403Error";
import Api404Error from "../errors/api404Error";
import Api500Error from "../errors/api404Error";
import hashPass from "../utils/hashPass";
import User from "../models/user";


export async function signUpUserService(req: Request, res: Response) {
    const hashedPassword = await hashPass(req.body.password);

    if (req.body.age) {
        const userAge = parseInt(req.body.age);
        if (userAge < 0 || userAge == NaN) throw new Api400Error("Age Is Invalid", "AGE_ERROR")
        req.body.age = userAge
    }

    const user = new User(req.body.username, req.body.name, req.body.lastname, req.body.email, hashedPassword, req.body.age);

    // Adding user to Database
    try {
        const emailExisting = await PrismaFindEmail(user.email)
        if (emailExisting) throw new Api404Error("Email Already Exists", "EMAIL_ERROR")

        const user_data = await createUser(user);
        console.log(user_data);

        const user_id = await PrismaFindUserByEmail(user.email)
        if (!user_id) throw new Api500Error("User Not Found", "INTERNAL_SERVER_ERROR")

        const userOTP = await RedisFindOTP(user_id.id)
        if (!userOTP) throw new Api500Error("Something went wrong sending password to email", "INTERNAL_SERVER_ERROR")

        sendMail({ to: user.email, OTP: userOTP })
        return res.status(201).send("User Created Successfully");
    } catch (error) {
        console.error(error);
        sendError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong creating user', res)

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
export async function createUser(user: User) {
    const user_data = await PrismaUserCreation(user.username, user.name, user.lastname, user.email, user.password, generateOTP(), user?.age);
    return user_data;
}


export async function loginUserService(req: Request, res: Response) {
    let user = await PrismaFindUserByEmail(req.body.email);
    if (user == null) {
        throw new Api400Error('Cannot find user', "EMAIL_ERROR")
    };

    const userEmail = await PrismaFindEmail(req.body.email)
    if (!userEmail?.verified) throw new Api401Error("Email is not active", "EMAIL_ERROR")

    try {
        if (await authorizePass(req.body.password, user.password)) {
            const accessToken = jwtAccessGen(user.id)
            const refresh_token = jwtRefreshGen(user.id)
            const redis_create = await RedisCreateRefreshToken(refresh_token, user.id)
            console.log(["Access", accessToken, "Refresh", refresh_token]);

            return res.status(200).json({ accessToken: accessToken, refresh_token: refresh_token });
        } else {
            throw new Api403Error("Not Allowed", "AUTHORITY_ERROR")
        }
    } catch (err) {
        console.error(err);
        throw new Api500Error('Something went wrong in user login', "INTERNAL_SERVER_ERROR")
    };
}


export async function logoutUserService(req: Request, res: Response) {
    const sentRefreshToken = req.body.token

    await jwt.verify(sentRefreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: VerifyErrors | null, user_id: any) => {
        if (err) {
            throw new Api403Error('Token is invalid or has expired, please login again', "TOKEN_ERROR")
        }
        const refreshtoken = await RedisFindRefreshToken(sentRefreshToken)
        if (!refreshtoken) throw new Api401Error("Refresh token not found", "TOKEN_ERROR")

        await RedisDeactivateRefreshToken(sentRefreshToken)
        return res.status(200).send("Logged out successfully");
    });
}


export async function refreshUserTokenService(req: Request, res: Response) {
    const sentRefreshToken = req.body.token;

    await jwt.verify(sentRefreshToken, process.env.REFRESH_TOKEN_SECRET as string, async (err: VerifyErrors | null, user_id: any) => {
        if (err) {
            throw new Api403Error('Token is invalid or has expired, please login again', "TOKEN_ERROR")
        }
        const refreshtoken = await RedisFindRefreshToken(sentRefreshToken)
        if (!refreshtoken) throw new Api401Error("Refresh token is not active, please login", "TOKEN_ERROR")

        return refreshToken(sentRefreshToken, res);
    });
}
