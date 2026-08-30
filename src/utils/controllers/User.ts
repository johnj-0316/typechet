export class User {
    username: string;
    email: string;
    password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username.trim();
        this.email = email.trim();
        this.password = password;
    }

    signUp(): void {

    }
};