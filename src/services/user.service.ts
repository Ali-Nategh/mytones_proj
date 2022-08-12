import { PrismaUserCreation } from "../repositories/user.repository";
import { check, validationResult } from 'express-validator';
import User from "../models/user";

export async function createUser(user: User, refresh_token: string){
    const user_data = await PrismaUserCreation(user.username, user.email, user.password, refresh_token, user?.age);
    return user_data;
}

export function validateUsername(){
    return check('username', 'The username must be atleast 3 characters long.')
        .exists()
        .isLength({ min: 3, max: 20})
}
export function validateEmail(){
    return check('email', 'The email is not valid.')
        .isEmail()
        .normalizeEmail()
        .exists()
}
export function validatePassword(){
    return check('password', 'Password is too short.')
        .isLength({ min: 6 })
        .exists()
}
export function validateAge(age: number){
    return (100 > age && age > 10)
}

