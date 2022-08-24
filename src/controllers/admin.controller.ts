import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { PrismaGetAllUsers } from "../repositories/user.repository";
import { exec } from 'child_process';

export async function adminGetAllUsers(req: Request, res: Response) {
    // Validate and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const users = await PrismaGetAllUsers()
    return res.send(users);
}

export function adminMigratePrisma() {
    exec('npx prisma migrate dev --name whateverName', (err, stdout, stderr) => {
        if (err) {
            //some err occurred    
            console.error(err)
        } else {
            // the *entire* stdout and stderr (buffered)   
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });
}
