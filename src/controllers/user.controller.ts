import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { createUser } from "../services/user.service";
import { jwtRefreshGen } from "../utils/jwtGenerate";
import Api400Error from "../errors/api400Error";
import Api500Error from "../errors/api400Error";
import hashPass from "../utils/hashPass";
import User from "../models/user";


export async function signUpUser(req: Request, res: Response, next: NextFunction){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const hashedPassword = await hashPass(req.body.password);
    // Get user info from request body and create a user object
    const user = new User(req.body.username, req.body.email, hashedPassword, req.body.age);
    // Generate a refreshToken for this user
    const refresh_token:string = jwtRefreshGen(user.username, user.email);

    try {
        // Adding user to Database
        const user_data = await createUser(user, refresh_token);
        console.log(user_data);
        return res.status(201).send("User Created Successfully");
    } catch (error){
        if (String(error).includes('email')){
            // res.status(400).send("Email already exists");
            next(new Api400Error('Email already exists'));
            return;
        }
        next(new Api500Error('Something went wrong creating user')); 
        return;
    };
};


export async function loginUser(req: Request, res: Response){

}


export async function refreshUserToken(req: Request, res: Response){

}


export async function logoutUser(req: Request, res: Response){

}
