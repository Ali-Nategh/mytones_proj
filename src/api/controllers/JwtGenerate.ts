import jwt, {VerifyErrors} from 'jsonwebtoken';

export function jwtRefreshGen(name: string, email: string){
    return jwt.sign({name: name, email: email}, process.env.REFRESH_TOKEN_SECRET as string);
}

export function jwtAccessGen(id: string){
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: '30m'});
} 

export function jwtVerify(token: string){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) =>{
        if (err) {
            throw new Error("Token is invalid or has expired, please login again")
        }
        return user
    });
}