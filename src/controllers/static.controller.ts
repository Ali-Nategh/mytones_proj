import { logError, sendError, sendOperationalError } from "../errors/errorHandler";
import { httpStatus } from "../errors/httpStatusCodes";
import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/baseError";
import { downloadSongService, uploadSongService } from "../services/static.service";


export async function getSong(req: Request, res: Response) {
    try {
        await downloadSongService(req, res)
    } catch (error: BaseError | any) {
        if (error.name === "TOKEN_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "PATH_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};

export async function uploadSong(req: Request, res: Response, next: NextFunction) {
    try {
        await uploadSongService(req, res, next)
    } catch (error: BaseError | any) {
        if (error.name === "TOKEN_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "PATH_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
