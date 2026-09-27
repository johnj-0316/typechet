import anonSupabase from "../../db/supabase_client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../db/database.types";
import { Tables } from "../../db/database.types";

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
    const { data, error } = await anonSupabase.auth.signUp({
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

// sign up with email/password
async function signIn(
    email: string, 
    password: string
): Promise<unknown> {
    email = email.trim();
    const { data, error } = await anonSupabase.auth.signInWithPassword({
        email,
        password
    });

    if (error)
        throw error;

    return data;
}

//returns user_profile row according to user.id
async function getUser(
    supabase: SupabaseClient<Database>,
    userId: string
): Promise<Tables<'user_profile'>> {
    // only works when policy allows for select (RLS)
    const { data, error } = await supabase
    .from('user_profile')
    .select()
    .eq('id', userId)
    .single();

    if (error)
        throw error;

    return data;
} 