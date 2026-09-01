import supabase from "../../db/supabase_client";

export class User {
    username: string;
    email: string;
    password: string;

    // password can include trailing spaces
    constructor(username: string, email: string, password: string) {
        this.username = username.trim();
        this.email = email.trim();
        this.password = password;
    }

    // create session in storage after signup
    // save username in user_metadata
    async signUp(): Promise<void> {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: this.email,
                password: this.password,
                options: {
                    data: {
                        username: this.username
                    }
                }
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

    // sign up with email/password
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

    static async getUser() {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error(`No session found for user!`);
            }

            const { data, error } = await supabase
            .from('user_profiles')
            .select()
            .eq('id', user.id)

            return user;
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(`Sign in error: ${err.message}`);
            }

            throw new Error(`An unexpected error occured. ${err}`);
        }
    } 
};