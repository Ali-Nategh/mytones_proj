var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import hashPass from "../utils/hash_pass";
import { jwtRefreshGen } from "../utils/jwt_generate";
import { PrismaUserCreation } from "../config/prisma_user";
import User from "../models/user";
export function signUpUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield hashPass(req.body.password);
            // Get user info from request body
            const user = new User(req.body.name, req.body.email, hashedPassword, req.body.age);
            // Generate a refreshToken for this user
            const refresh_token = jwtRefreshGen(user.name, user.email);
            // Add user to Database
            const user_data = yield PrismaUserCreation(user.name, user.email, hashedPassword, refresh_token, user === null || user === void 0 ? void 0 : user.age);
            // user.id = user_data.id || null;
            // user.refreshToken = refresh_token || "";
            console.log(user_data);
            // console.log(hashedPassword, user, refresh_token);
            res.status(201).send("User Created Successfully");
        }
        catch (error) {
            if (String(error).includes('email')) {
                res.status(400).send("Email already exists");
            }
            res.status(500).send();
        }
        ;
    });
}
;
//# sourceMappingURL=user.controller.js.map