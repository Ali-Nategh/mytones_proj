// Initializing PrismaClient
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


import * as Redis from "redis";
const redisClient = Redis.createClient()
redisClient.connect()

const EXPIRATION_TIME = 2592000 // 30 days

export async function PrismaUserCreation(username: string, name: string, lastname: string, email: string, password: string, otp: string, age?: any) {
    const user = await prisma.user.create({
        data: {
            username: username,
            name: name,
            lastname: lastname,
            password: password,
            age: age,
        }, include: {
            personalPlaylists: true,
        }
    });
    const userEmail = await prisma.email.create({
        data: {
            email: email,
            user_id: user.id,
        }, select: {
            email: true,
            verified: true,
        }
    });
    const userOTP = await prisma.otp.create({
        data: {
            otp: otp,
            user_id: user.id,
        }, select: {
            otp: true,
        }
    })
    return [user, userEmail, userOTP];
};

export async function RedisCreateRefreshToken(refresh_token: string, user_id: string) {
    const userRefreshToken = {
        id: refresh_token,
        user_id: user_id,
    }
    await redisClient.setEx(user_id, EXPIRATION_TIME, JSON.stringify(userRefreshToken));
    return userRefreshToken
}

export async function PrismaGetAllUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            name: true,
            lastname: true,
            age: true,
            updated_at: true,
            personalPlaylists: true,
        }
    });
    const usersEmail = await prisma.email.findMany({});
    const usersOTP = await prisma.otp.findMany({});
    const usersRefreshToken = await redisClient.keys('*') // -------------------------------------------------
    return [users, usersRefreshToken, usersEmail, usersOTP];
};


export async function PrismaFindUserByEmail(email: string) {
    const userEmail = await prisma.email.findUnique({
        where: { email: email }
    });
    const user = await prisma.user.findUnique({
        where: { id: userEmail?.user_id }
    });
    return user;
};

export async function PrismaFindUser(user_id: string) {
    const user = await prisma.user.findUnique({
        where: { id: user_id }
    });
    return user;
};

export async function PrismaFindEmail(email: string) {
    const userEmail = await prisma.email.findUnique({
        where: { email: email }
    });
    return userEmail;
};

export async function PrismaFindOTP(user_id: string) {
    const userOTP = await prisma.otp.findUnique({
        where: { user_id: user_id }
    });
    return userOTP;
};

export async function PrismaDeleteEverything() {
    await prisma.user.deleteMany({});
    await prisma.email.deleteMany({});
    await redisClient.flushAll(); // Whole Redis DataBase
    await prisma.otp.deleteMany({});
    await prisma.song.deleteMany({});
    await prisma.favorites.deleteMany({});
    await prisma.playlist.deleteMany({});
    await prisma.artist.deleteMany({});
    await prisma.album.deleteMany({});
};

export async function RedisFindRefreshToken(id: string) {
    const rtExists = await redisClient.get(id)
    if (!rtExists) return null;
    const refreshtoken = JSON.parse(`${rtExists}`)
    return refreshtoken;
};

export async function RedisDeactivateRefreshToken(id: string) {
    const refresh_token = await redisClient.del(id);
    return refresh_token;
};

export async function PrismaVerifyEmail(id: string) {
    await prisma.email.update({
        where: { id: id },
        data: { verified: true }
    });
};

export async function PrismaUpdateOtp(email: string, otp: string) {
    const userEmail = await prisma.email.findUnique({
        where: {
            email: email
        }
    });
    await prisma.otp.update({
        where: { user_id: userEmail?.user_id },
        data: { otp: otp }
    });
};
