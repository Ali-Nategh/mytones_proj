import { Request, Response } from "express";
import hashPass from "./HashPass";
import { jwtRefreshGen } from "./JwtGenerate";
import { PrismaUserCreation } from "../../config/PrismaUser";

import User from "../models/UserModel";

export async function signUpUser(req: Request, res: Response){
    try {
        const hashedPassword = await hashPass(req.body.password);

        // Get user info from request body
        const user = new User(req.body.name, req.body.email, hashedPassword, req.body.age);

        // Generate a refreshToken for this user
        const refresh_token:string = jwtRefreshGen(user.name, user.email);

        
        // Add user to Database
        const user_data = await PrismaUserCreation(user.name, user.email, hashedPassword, refresh_token, user?.age);
        // user.id = user_data.id || null;
        // user.refreshToken = refresh_token || "";
        console.log(user_data);
        // console.log(hashedPassword, user, refresh_token);
        res.status(201).send("User Created Successfully");
    } catch (error){
        if (String(error).includes('email')){
            res.status(400).send("Email already exists");
        }
        res.status(500).send();
    };
};


