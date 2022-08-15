import {
    PrismaActivateRefreshToken, PrismaDeactivateRefreshToken, PrismaFindByEmail,
    PrismaFindRefreshToken, PrismaUserCreation
} from "../repositories/user.repository";
import { logError, isOperationalError } from "../errors/errorHandler";
import { jwtRefreshGen, jwtAccessGen } from "../utils/jwtToken";
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { Request, Response, NextFunction } from "express";
import { sendError } from "../errors/errorHandler";
import { authorizePass } from "../utils/authPass";
import { check } from "express-validator";
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
        return sendError(400, 'Cannot find user', res)
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

    const refreshtoken = await PrismaFindRefreshToken(sentRefreshToken)

    if (refreshtoken == null) return res.status(404).send("Refresh token not found");
    else if (refreshtoken.valid == false) return res.status(403).send("Already logged out");

    await PrismaDeactivateRefreshToken(sentRefreshToken)
    return res.status(200).send("Logged out successfully");
}



export async function refreshUserTokenService(req: Request, res: Response) {
    // // POST '/user/refreshtoken'
    // app.post('/user/refreshtoken', async (req: Request, res: Response) =>{
    //     const refreshToken = req.body.token;
    //     if (refreshToken == null) return res.status(400).send("Please include a refresh token");
    //     const refresh_token = await prisma.refreshToken.findUnique({
    //         where: {id: refreshToken}
    //     });
    //     if (refresh_token == null) return res.status(404).send("Refresh token not found");
    //     if (refresh_token.valid == false) return res.status(403).send("Refresh token is not active, please login");

    //     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user: any) => {
    //         if (err) return res.sendStatus(403);
    //         const accessToken = generateToken(user);
    //         res.json({accessToken: accessToken});
    //     });
    // });
}



export async function createUser(user: User, refresh_token: string) {
    const user_data = await PrismaUserCreation(user.username, user.email, user.password, refresh_token, user?.age);
    return user_data;
}



export function validateUsername() {
    return check('username', 'The username must be atleast 3 characters long.')
        .exists()
        .isLength({ min: 3, max: 20 })
}
export function validateEmail() {
    return check('email', 'The email is not valid.')
        .isEmail()
        .normalizeEmail()
        .exists()
}
export function validatePassword() {
    return check('password', 'Password is too short.')
        .isLength({ min: 6 })
        .exists()
}
export function validateAge(age: number) {
    return (100 > age && age > 10)
}

export function validateToken() {
    return check('token', 'Token was invalid or not found.')
        .isJWT()
        .exists()
}

