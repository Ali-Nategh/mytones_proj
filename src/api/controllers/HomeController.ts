import { Request, Response } from "express";

import { PrismaGetAllUsers } from "../../config/PrismaUser";

export async function getHome(req: Request, res: Response){
    res.send(await PrismaGetAllUsers());
};
