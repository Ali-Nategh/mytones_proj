import { PrismaUserCreation } from "../repositories/user.repository";
import User from "../models/user";

export async function createUser(user: User, refresh_token: string){
    const user_data = await PrismaUserCreation(user.name, user.email, user.password, refresh_token, user?.age);
    return user_data;
}

