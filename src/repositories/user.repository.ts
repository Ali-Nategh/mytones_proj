// Initializing PrismaClient
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function PrismaUserCreation(name: string, email: string, password: string, refresh_token: string, age?: any) {
    const user = await prisma.user.create({   
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
        include: {refreshToken: true}
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



export async function PrismaDeleteAllUsers() {
    await prisma.user.deleteMany({});
};