import { jwtVerify } from "../utils/jwt_generate";
export default function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    try {
        req.body.user = jwtVerify(token);
        next();
    }
    catch (error) {
        res.status(403).send(error.message);
    }
}
;
//# sourceMappingURL=authenticate_token.middleware.js.map