import {
    PrismaActivateRefreshToken, PrismaDeactivateRefreshToken, PrismaFindByEmail,
    PrismaFindRefreshToken, PrismaUserCreation
} from "../repositories/user.repository";
import { logError, isOperationalError } from "../errors/errorHandler";
import { jwtRefreshGen, jwtAccessGen, refreshToken, jwtVerifyRefreshToken } from "../utils/jwtToken";
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { Request, Response, NextFunction, response } from "express";
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
        const user_data = await createUser(user, refresh_token);
        console.log(user_data);
        return res.status(201).send("User Created Successfully");
    } catch (error) {
        if (String(error).includes("email")) {
            // res.status(400).send("Email already exists");
            return sendError(httpStatusCodes.BAD_REQUEST, "Email already exists", res)
        }
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
    if (sentRefreshToken == null) return sendError(httpStatusCodes.BAD_REQUEST, "Please include a refresh token", res)
    try {
        jwtVerifyRefreshToken(sentRefreshToken)
    } catch (err) {
        return sendError(403, "Token is invalid, please login again", res)
    }
    const refreshtoken = await PrismaFindRefreshToken(sentRefreshToken)
    if (refreshtoken == null) return sendError(httpStatusCodes.NOT_FOUND, "Refresh token not found", res)
    else if (refreshtoken.valid == false) return sendError(httpStatusCodes.BAD_REQUEST, "Already logged out", res)

    await PrismaDeactivateRefreshToken(refreshtoken.id)
    return res.status(200).send("Logged out successfully");
}



export async function refreshUserTokenService(req: Request, res: Response) {
    const sentRefreshToken = req.body.token;
    if (sentRefreshToken == null) return sendError(httpStatusCodes.BAD_REQUEST, "Please include a refresh token", res)
    try {
        jwtVerifyRefreshToken(sentRefreshToken)
    } catch (err) {
        return sendError(403, "Token is invalid, please login again", res)
    }
    const refresh_token = await PrismaFindRefreshToken(sentRefreshToken)
    if (refresh_token == null) return sendError(httpStatusCodes.NOT_FOUND, "Refresh token not found", res)
    if (refresh_token.valid == false) return sendError(httpStatusCodes.UNAUTHORIZED, "Refresh token is not active, please login", res)

    refreshToken(sentRefreshToken, res);
}



export async function createUser(user: User, refresh_token: string) {
    const user_data = await PrismaUserCreation(user.username, user.email, user.password, refresh_token, user?.age);
    return user_data;
}
