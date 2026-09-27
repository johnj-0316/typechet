import { PostgrestError, AuthError } from "@supabase/supabase-js";

export { isPostgrestError, isAuthError };

function isPostgrestError(error: unknown): error is PostgrestError {
    return (
        error !== undefined
        && error instanceof Error 
        && "code" in error 
        && "hint" in error 
        && typeof error.code === "string"
        && error.code.includes("PGRST")
    );
}

function isAuthError(error: unknown): error is AuthError {
    return (
        error !== undefined
        && error instanceof Error 
        && "code" in error 
        && "status" in error
    );
}