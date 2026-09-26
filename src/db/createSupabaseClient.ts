import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export function createSupabaseClient(accessToken: string) {
    return createClient<Database>(
        import.meta.env["NG_APP_SUPABASE_URL"],
        import.meta.env["NG_APP_SUPABASE_KEY"],
        {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        }
    );
}