import { Request, Response, NextFunction } from "express";
import { ClientError, ServerError } from "./Error";
import { AuthError, PostgrestError } from "@supabase/supabase-js";

export function handleError(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof ClientError) {
        res.status(error.statusCode).json({ type: "Client Error", error });
        return;
    }

    if (error instanceof ServerError) {
        // add middleware to log these types of errors to us.
        res.status(error.statusCode).json({ type: "Server Error", error });
        return;
    }

    if (error instanceof AuthError || error instanceof PostgrestError) {
        // add middleware to log these types of errors to us.
        res.status(403).json({ type: "Supabase Error", error: { message: "Something went wrong fetching the data." }});
        return;
    }

    res.status(500).json({ type: "Unknown Error", error });
    return;
}