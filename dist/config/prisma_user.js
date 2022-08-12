var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Initializing PrismaClient
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export function PrismaUserCreation(name, email, password, refresh_token, age) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                age: age,
                refreshToken: {
                    create: {
                        id: refresh_token
                    }
                }
            },
            include: { refreshToken: true }
        });
        return user;
    });
}
;
export function PrismaGetAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany({
        // select: {
        //     name: true,
        //     email: true
        // }
        });
        return users;
    });
}
;
export function PrismaDeleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () { yield prisma.user.deleteMany({}); });
}
;
//# sourceMappingURL=prisma_user.js.map