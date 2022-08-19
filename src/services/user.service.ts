import {
    PrismaActivateRefreshToken, PrismaDeactivateRefreshToken, PrismaFindByEmail,
    PrismaFindRefreshToken, PrismaUserCreation, PrismaVerifyEmail
} from "../repositories/user.repository";
import { logError, isOperationalError } from "../errors/errorHandler";
import { jwtRefreshGen, jwtAccessGen, refreshToken, jwtVerifyRefreshToken } from "../utils/jwtToken";
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { Request, Response, NextFunction } from "express";
import { sendMail } from '../services/email.service';
import generateOTP from '../services/otp.service';
import { sendError } from "../errors/errorHandler";
import { authorizePass } from "../utils/authPass";
import hashPass from "../utils/hashPass";
import User from "../models/user";

export async function signUpUserService(req: Request, res: Response) {
    // Hash the password
    const hashedPassword = await hashPass(req.body.password);
    // Get user info from request body
    const user = new User(req.body.username, req.body.email, hashedPassword, req.body.age);
    // Generate a refreshToken for this user
    const refresh_token: string = jwtRefreshGen(user.username, user.email);
    // Adding user to Database
    try {
        const isExisting = await PrismaFindByEmail(user.email)
        if (isExisting) return sendError(httpStatusCodes.BAD_REQUEST, "Email already exists", res)
        const user_data = await createUser(user, refresh_token);
        console.log(user_data);
        sendMail({ to: user_data.email, OTP: user_data.otp })
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
    let user = null || await PrismaFindByEmail(req.body.email);
    if (user == null) {
        return sendError(httpStatusCodes.BAD_REQUEST, 'Cannot find user', res)
    };
    if (!user.active) return sendError(httpStatusCodes.UNAUTHORIZED, "Email is not active", res)
    try {
        if (await authorizePass(req.body.password, user.password)) {
            const accessToken = jwtAccessGen(user.id)
            const refresh_token = await PrismaActivateRefreshToken(user.id);
            res.json({ accessToken: accessToken, refresh_token: refresh_token.id });
        } else {
            return sendError(httpStatusCodes.UNAUTHORIZED, "Not Allowed", res)
        }
    } catch (err) {
        console.error(err);
        return sendError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong creating user', res)
    };
}



export async function logoutUserService(req: Request, res: Response) {
    const sentRefreshToken = req.body.token

    if (! await checkRefreshToken(sentRefreshToken, res)) return
    const refreshtoken = await PrismaFindRefreshToken(sentRefreshToken)
    if (!refreshtoken) return sendError(httpStatusCodes.UNAUTHORIZED, "Refresh token not found", res)
    await PrismaDeactivateRefreshToken(refreshtoken.id)
    return res.status(200).send("Logged out successfully");
}



export async function refreshUserTokenService(req: Request, res: Response) {
    const sentRefreshToken = req.body.token;

    if (! await checkRefreshToken(sentRefreshToken, res)) return

    refreshToken(sentRefreshToken, res);
}

async function checkRefreshToken(sentRefreshToken: string, res: Response) {
    if (sentRefreshToken == null) return sendError(httpStatusCodes.BAD_REQUEST, "Please include a refresh token", res)
    try {
        jwtVerifyRefreshToken(sentRefreshToken)
    } catch (err) {
        return sendError(httpStatusCodes.UNAUTHORIZED, "Token is invalid, please login again", res)
    }
    const refreshtoken = await PrismaFindRefreshToken(sentRefreshToken)
    if (refreshtoken == null) return sendError(httpStatusCodes.NOT_FOUND, "Refresh token not found or is invalid", res)
    else if (refreshtoken.valid == false) return sendError(httpStatusCodes.UNAUTHORIZED, "Refresh token is not active, please login", res)

    return true
}



export async function createUser(user: User, refresh_token: string) {
    const user_data = await PrismaUserCreation(user.username, user.email, user.password, refresh_token, generateOTP(), user?.age);
    return user_data;
}
