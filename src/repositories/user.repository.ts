// Initializing PrismaClient
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PrismaUserCreation(name: string, email: string, password: string, refresh_token: string, age?: any) {
    const user = await prisma.user.create({
        data: {
            username: name,
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
};

export async function PrismaGetAllUsers() {
    const users = await prisma.user.findMany({
        // select: {
        //     name: true,
        //     email: true
        // }
    });
    return users;
};


export async function PrismaFindByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });
    return user;
};

export async function PrismaFindRefreshToken(sentRefreshToken: string) {
    const refreshtoken = await prisma.refreshToken.findUnique({
        where: { id: sentRefreshToken }
    });
    return refreshtoken;
};

export async function PrismaDeleteAllUsers() {
    await prisma.user.deleteMany({});
};


export async function PrismaActivateRefreshToken(id: string) {
    const refresh_token = await prisma.refreshToken.update({
        where: { userId: id },
        data: { valid: true }
    });
    return refresh_token;
};

export async function PrismaDeactivateRefreshToken(refreshToken: string) {
    prisma.refreshToken.update({
        where: { id: refreshToken },
        data: { valid: false }
    });
};
