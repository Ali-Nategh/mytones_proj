import { Request, Response } from "express";

import { PrismaGetAllUsers } from "../config/prisma_user";

export async function getHome(req: Request, res: Response){
    res.send(await PrismaGetAllUsers());
};
