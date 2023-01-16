import jwt, { VerifyErrors } from 'jsonwebtoken';
import Api400Error from "../errors/api400Error";
import Api403Error from "../errors/api403Error";
import { Request, Response } from "express";
import path from 'path';
import Api404Error from '../errors/api404Error';
import { sendError } from '../errors/errorHandler';



export async function getSongService(req: Request, res: Response) {
    var sentAccessToken = req.headers.authorization
    if (!sentAccessToken || !sentAccessToken.includes('Bearer')) throw new Api400Error('Token is missing or has an issue', "TOKEN_ERROR")
    sentAccessToken = sentAccessToken.split(' ')[1]

    const song_path = req.params.song_path
    const absolute_path = path.normalize(`${__dirname}/../public`)

    return jwt.verify(sentAccessToken, process.env.ACCESS_TOKEN_SECRET as string, async (err: VerifyErrors | null, user_id: any) => {
        if (err) throw new Api403Error('Token is invalid or has expired, please login again', "TOKEN_ERROR")

        res.sendFile(song_path, { root: absolute_path }, (err) => {
            if (err) sendError(400, 'Song path not found', res)

            return res.status(200).end();
        });
    });
}

export async function uploadSongService(req: Request, res: Response) {
    var sentAccessToken = req.headers.authorization
    if (!sentAccessToken || !sentAccessToken.includes('Bearer')) throw new Api400Error('Token is missing or has an issue', "TOKEN_ERROR")
    sentAccessToken = sentAccessToken.split(' ')[1]

    const song_path = req.params.song_path
    const absolute_path = path.normalize(`${__dirname}/../public`)

    return jwt.verify(sentAccessToken, process.env.ACCESS_TOKEN_SECRET as string, async (err: VerifyErrors | null, user_id: any) => {
        if (err) throw new Api403Error('Token is invalid or has expired, please login again', "TOKEN_ERROR")

    });
}
