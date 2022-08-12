export default class User {
    id: any = undefined;
    name:string;
    password:string;
    email:string;
    age:any;
    role: string = "BASIC";
    refreshToken:string = "";

    constructor(name:string, email:string, password:string, age?:number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }
}