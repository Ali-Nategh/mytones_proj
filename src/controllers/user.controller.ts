import { Request, Response } from "express";
import hashPass from "../utils/hashPass";
import { jwtRefreshGen } from "../utils/jwtGenerate";
import { PrismaUserCreation } from "../repositories/user.repository";

import User from "../models/user";

export async function signUpUser(req: Request, res: Response){
    try {
        const hashedPassword = await hashPass(req.body.password);

        // Get user info from request body
        const user = new User(req.body.name, req.body.email, hashedPassword, req.body.age);

        // Generate a refreshToken for this user
        const refresh_token:string = jwtRefreshGen(user.name, user.email);

        
        // Add user to Database
        const user_data = await PrismaUserCreation(user.name, user.email, hashedPassword, refresh_token, user?.age);

        console.log(user_data);

        res.status(201).send("User Created Successfully");
    } catch (error){
        if (String(error).includes('email')){
            res.status(400).send("Email already exists");
        }
        res.status(500).send();
    };
};


