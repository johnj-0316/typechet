import supabase from "../../db/supabase_client";

export class User {
    username: string;
    email: string;
    password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username.trim();
        this.email = email.trim();
        this.password = password;
    }

    async signUp(): Promise<void> {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: this.email,
                password: this.password
            });

            if (error)
                throw error;

            console.log(`Signed up user with email ${data?.user?.email}`);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`Sign up error: ${err.message}`);
            }

            throw new Error(`An unexpected error occurred. ${err}`);
        }
    }

    async signIn(): Promise<void> {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: this.email,
                password: this.password
            });

            if (error)
                throw error;

            console.log(`Logged in user with email ${data?.user?.email}`);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(`Sign in error: ${err.message}`);
            }

            throw new Error(`An unexpected error occured. ${err}`);
        }
    }
};