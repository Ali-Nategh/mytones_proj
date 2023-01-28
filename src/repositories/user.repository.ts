// Initializing PrismaClient
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import * as Redis from "redis";
import { seperator } from '../utils/seperator';
const redisClient = Redis.createClient({
    // socket: {
    //     host: 'mytones_proj-redis-1',
    //     port: 6379,
    // }
})
redisClient.connect()

const REFRESH_EXPIRATION_TIME = 2592000 // 30 days
const OTP_EXPIRATION_TIME = 120 // 2 minutes

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
    const userOTP = await RedisCreateOTP(otp, user.id)
    return [user, userEmail, userOTP];
};

export async function RedisCreateRefreshToken(refresh_token: string, user_id: string) {
    const userRefreshToken = {
        user_id: user_id,
    }
    await redisClient.setEx(refresh_token, REFRESH_EXPIRATION_TIME, JSON.stringify(userRefreshToken));
    return userRefreshToken
}

export async function RedisCreateOTP(OTP: string, user_id: string) {
    await redisClient.setEx(user_id, OTP_EXPIRATION_TIME, OTP);
    return OTP
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
    const usersOTP = await redisClient.keys('*'); // -------------------------
    const usersRefreshToken = await redisClient.keys('*') // -------------------------------------------------
    return [seperator("USERS"), users, seperator("REFRESH_TOKENS"), usersRefreshToken, seperator("EMAILS"), usersEmail, seperator("OTPS"), usersOTP];
};


export async function PrismaFindUserByEmail(email: string) {
    const userEmail = await prisma.email.findUnique({
        where: { email: email }
    });
    if (!userEmail) return null;
    const user = await prisma.user.findUnique({
        where: { id: userEmail.user_id }
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

export async function PrismaDeleteEverything() {
    await prisma.user.deleteMany({});
    await prisma.email.deleteMany({});
    await redisClient.flushAll(); // Whole Redis DataBase
    await prisma.song.deleteMany({});
    // await prisma.favorites.deleteMany({}); -------------------------------------
    await prisma.playlist.deleteMany({});
    await prisma.artist.deleteMany({});
    await prisma.album.deleteMany({});
    await prisma.actions.deleteMany({});
};

export async function RedisFindRefreshToken(refresh_token: string) {
    const rtExists = await redisClient.get(refresh_token)
    if (!rtExists) return null;
    const refreshtoken = JSON.parse(`${rtExists}`)
    return refreshtoken;
};

export async function RedisDeactivateRefreshToken(refresh_token: string) {
    const token_delete = await redisClient.del(refresh_token);
    return token_delete;
};

export async function PrismaVerifyEmail(id: string) {
    await prisma.email.update({
        where: { id: id },
        data: { verified: true }
    });
};

export async function RedisUpdateOtp(email: string, otp: string) {
    const userEmail = await prisma.email.findUnique({
        where: {
            email: email
        }
    });
    if (!userEmail) return null;
    await RedisCreateOTP(otp, userEmail.user_id)
};

export async function RedisFindOTP(user_id: string) {
    const userOTP = await redisClient.get(user_id);
    return userOTP;
};
