import jwt, { VerifyErrors } from 'jsonwebtoken';
import { sendError } from '../errors/errorHandler';
import { Response } from 'express';

export function jwtRefreshGen(name: string, email: string) {
    return jwt.sign({ name: name, email: email }, process.env.REFRESH_TOKEN_SECRET as string);
}

export function jwtAccessGen(id: string) {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' });
}

export function jwtVerifyAccessToken(token: string) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: VerifyErrors | null, user) => {
        if (err) {
            console.error(err);
            throw new Error(err.message)
        }
        return user
    });
}

export function jwtVerifyRefreshToken(token: string) {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user) => {
        if (err) {
            throw new Error(err.message)
        }
        return user
    });
}

export function refreshToken(refreshToken: string, res: Response) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user: any) => {
        if (err) {
            return sendError(403, "Token is invalid or is deactivated, please login again", res)
        }
        const accessToken = jwtAccessGen(user);
        res.json({ accessToken: accessToken });
    });
}
