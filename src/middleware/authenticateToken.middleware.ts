import { Request, Response, NextFunction } from 'express';
import { jwtVerifyAccessToken } from "../utils/jwtToken";
import { sendError } from '../errors/errorHandler';

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return sendError(400, 'Token missing', res)

    try {
        req.body.user = jwtVerifyAccessToken(token)
        next()
    } catch (error: any) {
        sendError(403, 'Token is invalid or has expired, please login again', res)
    }
};

// function authenticateToken(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) =>{
//         if (err) {
//             return res.status(403).send("Token is invalid or has expired, please login again")
//         }
//         req.body.user = user
//         next()
//     });
// };