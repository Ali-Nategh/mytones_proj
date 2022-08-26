import { Request, Response } from "express";
import { PrismaGetAllUsers } from "../repositories/user.repository";
import { PrismaDeleteEverything } from "../repositories/user.repository";
import { exec } from 'child_process';
import { PrismaGetAllMusic } from "../repositories/music.repository";

export async function adminGetAllUsers(req: Request, res: Response) {
    const users = await PrismaGetAllUsers()
    return res.status(200).send(users);
}

export function adminMigratePrisma(req: Request, res: Response) {
    exec('npx prisma migrate dev --name whateverName', (err, stdout, stderr) => {
        if (err) {
            //some err occurred    
            console.error(err);
            return res.status(500).send('migration failed');
        } else {
            // the *entire* stdout and stderr (buffered)   
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            return res.status(200).send('migrated successfully');
        }
    });
}

export async function adminGetMusics(req: Request, res: Response) {
    const musics = await PrismaGetAllMusic()
    return res.status(200).send(musics);
}

export async function adminDeleteDatabase(req: Request, res: Response) {
    await PrismaDeleteEverything()
    return res.status(200).send('deleted successfully');
}
