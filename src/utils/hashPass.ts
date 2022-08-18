import bcrypt from 'bcrypt';

export default function hashPass(password: string) {
    return (bcrypt.hash(password, 10))
}
