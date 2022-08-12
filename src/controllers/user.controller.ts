import { Request, Response } from "express";
import hashPass from "../utils/hashPass";
import { jwtRefreshGen } from "../utils/jwtGenerate";
import { createUser } from "../services/user.service";

import User from "../models/user";

export async function signUpUser(req: Request, res: Response){
    
    const hashedPassword = await hashPass(req.body.password);
    // Get user info from request body and create a user object
    const user = new User(req.body.name, req.body.email, hashedPassword, req.body.age);
    // Generate a refreshToken for this user
    const refresh_token:string = jwtRefreshGen(user.name, user.email);
 
    try {
        // Adding user to Database
        const user_data = await createUser(user, refresh_token);

        console.log(user_data);
        return res.status(201).send("User Created Successfully");
    } catch (error){
        if (String(error).includes('email')){
            res.status(400).send("Email already exists");
        }
        return res.status(500).send();
    };
};
