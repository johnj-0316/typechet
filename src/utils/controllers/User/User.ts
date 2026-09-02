import supabase from "../../../db/supabase_client";

export { signUp, signIn, getUser };

// create session in storage after signup
// save username in user_metadata
async function signUp(
    username: string, 
    email: string, 
    password: string
): Promise<unknown> {
    username = username.trim();
    email = email.trim();
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        });

        if (error)
            throw error;

        return data?.user;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Sign up error: ${err.message}`);
        }

        throw new Error(`An unexpected error occurred. ${err}`);
    }
}

// sign up with email/password
async function signIn(
    email: string, 
    password: string
): Promise<unknown> {
    email = email.trim();
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error)
            throw error;

        return data?.user;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Sign in error: ${err.message}`);
        }

        throw new Error(`An unexpected error occured. ${err}`);
    }
}

//returns user_profile row according to user.id
async function getUser(): Promise<unknown> {
    try {
        // data will always have user property, success or fail
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) {
            throw new Error(`No session found for user!`);
        }

        // only works when policy allows for select (RLS)
        const { data, error } = await supabase
        .from('user_profile')
        .select()
        .eq('id', user.id)

        if (error)
            throw error;

        return data;
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Sign in error: ${err.message}`);
        }

        throw new Error(`An unexpected error occured. ${err}`);
    }
} 