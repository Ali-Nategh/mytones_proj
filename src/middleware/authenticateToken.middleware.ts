import { Request, Response, NextFunction } from 'express';
import { jwtVerifyToken } from "../utils/jwtToken";
import { sendError } from '../errors/errorHandler';

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return sendError(403, 'Not authorized', res)

    try {
        req.body.user = jwtVerifyToken(token)
        next()
    } catch (error: any) {
        sendError(403, 'Not authorized', res)
    }
};
