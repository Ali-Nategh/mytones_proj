import { logError, sendError, sendOperationalError } from "../errors/errorHandler";
import { httpStatus } from "../errors/httpStatusCodes";
import { Request, Response } from "express";
import BaseError from "../errors/baseError";
import { getSongService, uploadSongService } from "../services/static.service";


export async function getSong(req: Request, res: Response) {
    try {
        await getSongService(req, res)
    } catch (error: BaseError | any) {
        console.log('CAUGHT')
        if (error.name === "TOKEN_ERROR") {
            console.log('token')
            return sendOperationalError(error, res)
        } else if (error.name === "PATH_ERROR") {
            console.log('path')
            return sendOperationalError(error, res)
        } else {
            console.log('ffs')
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};

export async function uploadSong(req: Request, res: Response) {
    try {
        await uploadSongService(req, res)
    } catch (error: BaseError | any) {
        console.log('CAUGHT')
        if (error.name === "TOKEN_ERROR") {
            console.log('token')
            return sendOperationalError(error, res)
        } else if (error.name === "PATH_ERROR") {
            console.log('path')
            return sendOperationalError(error, res)
        } else {
            console.log('ffs')
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
