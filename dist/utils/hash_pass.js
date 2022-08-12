import bcrypt from 'bcrypt';
export default function hashPass(password) {
    return (bcrypt.hash(password, 10));
}
//# sourceMappingURL=hash_pass.js.map