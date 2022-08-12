import {Request, Response, NextFunction} from 'express';
import { jwtVerify } from "../utils/jwtGenerate";

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    try {
        req.body.user = jwtVerify(token)
        next()
    } catch (error: any) {
        res.status(403).send(error.message)
    }
};
