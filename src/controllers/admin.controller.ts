import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { PrismaGetAllUsers } from "../repositories/user.repository";

export async function adminGetAllUsers(req: Request, res: Response) {
    // Validate and handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const users = await PrismaGetAllUsers()
    return res.send(users);
}
