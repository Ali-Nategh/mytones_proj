import { Request, Response } from "express";

import { PrismaDeleteAllUsers } from "../repositories/user.repository";

export async function getHome(req: Request, res: Response) {
    res.status(200).send("WELCOME TO THE HOME PAGE");
};
