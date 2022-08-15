import { check } from "express-validator";


export function validateUsername() {
    return check('username', 'The username must be atleast 3 characters long.')
        .exists()
        .isLength({ min: 3, max: 20 })
}
export function validateEmail() {
    return check('email', 'The email is not valid.')
        .isEmail()
        .normalizeEmail()
        .exists()
}
export function validatePassword() {
    return check('password', 'Password is too short.')
        .isLength({ min: 6 })
        .exists()
}
export function validateAge(age: number) {
    return (100 > age && age > 10)
}
export function validateToken() {
    return check('token', 'Token was invalid or not found.')
        .isJWT()
        .exists()
}
