import jwt from 'jsonwebtoken';
export function jwtRefreshGen(name, email) {
    return jwt.sign({ name: name, email: email }, process.env.REFRESH_TOKEN_SECRET);
}
export function jwtAccessGen(id) {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30m' });
}
export function jwtVerify(token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            throw new Error("Token is invalid or has expired, please login again");
        }
        return user;
    });
}
//# sourceMappingURL=jwt_generate.js.map