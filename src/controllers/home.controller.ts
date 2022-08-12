import { Request, Response } from "express";

import { PrismaGetAllUsers } from "../repositories/user.repository";

export async function getHome(req: Request, res: Response){
    res.send(await PrismaGetAllUsers());
};
