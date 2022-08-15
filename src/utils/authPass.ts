import bcrypt from 'bcrypt';

export function authorizePass(enteredPassword: string, userPassword: string) {
    return bcrypt.compare(enteredPassword, userPassword)
}
