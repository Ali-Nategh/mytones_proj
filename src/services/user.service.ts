import { logError, isOperationalError } from "../errors/errorHandler";
import { PrismaUserCreation } from "../repositories/user.repository";
import { Request, Response, NextFunction } from "express";
import { jwtRefreshGen } from "../utils/jwtGenerate";
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { sendError } from "../errors/errorHandler";
import { check } from "express-validator";
import hashPass from "../utils/hashPass";
import User from "../models/user";


export async function signUpUserService(req: Request, res: Response, next: NextFunction){
    // Hash the password
    const hashedPassword = await hashPass(req.body.password);
    // Get user info from request body
    const user = new User(req.body.username, req.body.email, hashedPassword, req.body.age);
    // Generate a refreshToken for this user
    const refresh_token:string = jwtRefreshGen(user.username, user.email);
    // Adding user to Database
    try {
        const user_data = await createUser(user, refresh_token);
        console.log(user_data);
        return res.status(201).send("User Created Successfully");
    } catch (error){
        if (String(error).includes("email")){
            // res.status(400).send("Email already exists");
            return sendError(httpStatusCodes.BAD_REQUEST, "Email already exists", res)
        }
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








export async function createUser(user: User, refresh_token: string){
    const user_data = await PrismaUserCreation(user.username, user.email, user.password, refresh_token, user?.age);
    return user_data;
}




export function validateUsername(){
    return check('username', 'The username must be atleast 3 characters long.')
        .exists()
        .isLength({ min: 3, max: 20})
}
export function validateEmail(){
    return check('email', 'The email is not valid.')
        .isEmail()
        .normalizeEmail()
        .exists()
}
export function validatePassword(){
    return check('password', 'Password is too short.')
        .isLength({ min: 6 })
        .exists()
}
export function validateAge(age: number){
    return (100 > age && age > 10)
}

export function validateToken(){
    return check('token', 'Token was invalid or not found.')
        .isJWT()
        .exists()
}

