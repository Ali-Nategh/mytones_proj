import ApiError from "../models/ApiError";
import { Request, Response, NextFunction } from 'express';

export function apiErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    // // better use library winston or bunja
    // console.error(err);

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message)
        return;
    }

    res.status(500).json('Something went wrong')
}
