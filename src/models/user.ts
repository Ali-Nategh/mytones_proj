export default class User {
    id: any = undefined;
    username: string;
    password: string;
    email: string;
    age: any;
    role: string = "BASIC";
    refreshToken: string = "";

    constructor(name: string, email: string, password: string, age?: number) {
        this.username = name;
        this.password = password;
        this.email = email;
        this.age = age;
    }
}