import jwt, { VerifyErrors } from 'jsonwebtoken';
import Api401Error from '../errors/api401Error';
import { Response } from 'express';

export function jwtRefreshGen(name: string, email: string) {
    return jwt.sign({ name: name, email: email }, process.env.REFRESH_TOKEN_SECRET as string);
}

export function jwtAccessGen(id: string) {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '30m' });
}

export function jwtVerifyToken(token: string) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: VerifyErrors | null, user) => {
        if (err) {
            throw new Api401Error("Token is invalid or has expired, please login again")
        }
        return user
    });
}

export function refreshToken(refreshToken: string, res: Response) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user: any) => {
        if (err) {
            throw new Api401Error("Token is invalid or is deactivated, please login again")
        }
        const accessToken = jwtAccessGen(user);
        res.json({ accessToken: accessToken });
    });
}
