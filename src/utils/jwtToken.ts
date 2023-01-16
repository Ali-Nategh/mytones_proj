import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';
import { sendError } from '../errors/errorHandler';
import { Response } from 'express';

export function jwtRefreshGen(id: string) {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string);
}

export function jwtAccessGen(id: string) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' });
}

export function jwtVerifyAccessToken(token: string) {
    var user
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: VerifyErrors | null, user_id) => {
        if (err) {
            console.error(err);
            throw new Error(err.message)
        }
        user = user_id
    });
    return user
}

export function jwtVerifyRefreshToken(token: string) {
    var user
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user_id) => {
        if (err) {
            throw new Error(err.message)
        }
        user = user_id
    });
    return user
}

export function refreshToken(refreshToken: string, res: Response) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user_id: any) => {
        if (err) {
            return sendError(403, "Token is invalid or is deactivated, please login again", res)
        }
        const accessToken = jwtAccessGen(user_id);
        return res.status(200).json({ accessToken: accessToken });
    });
    return
}
