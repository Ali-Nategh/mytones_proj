export default class User {
    id: any = undefined;
    username: string;
    name: string;
    lastname: string;
    password: string;
    email: string;
    age: any;
    role: string = "BASIC";
    refreshToken: string = "";

    constructor(username: string, name: string, lastname: string, email: string, password: string, age?: number) {
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.age = age;
    }
}