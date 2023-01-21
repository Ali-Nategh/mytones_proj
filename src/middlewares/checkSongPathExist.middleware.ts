import { Request, Response, NextFunction } from 'express';
import { sendError } from '../errors/errorHandler';

var multiparty = require('multiparty');
import { existsSync } from 'fs';
import path from 'path';


// Useless
export default async function checkSongPathExists(req: Request, res: Response, next: NextFunction) {
    var song_name
    try {
        const form = new multiparty.Form();
        const req_copy = req
        await form.parse(req_copy, function (err: any, fields: any, files: any) {
            song_name = `${files.songUpload[0].originalFilename}`;


            if (song_name === '' || song_name === undefined) return sendError(400, 'File name empty', res);

            const absolute_path = path.normalize(`${__dirname}/../public/${song_name}`)

            if (existsSync(absolute_path)) return sendError(400, 'File already exists', res);

            // res.status(201).send("Song Uploaded Successfully");

            next()
        });
    } catch (error) {
        console.error(error)
        sendError(500, 'Something went wrong', res);
    }
};
