import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../../db/database.types";

type UserAuthContext = {
    supabase: SupabaseClient<Database>;
    userId: string;
};

type UsersReqHeaderParams = {
    authorization: string;
};

export type {
    UserAuthContext,
    UsersReqHeaderParams,
};