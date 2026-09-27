import { Request, Response, NextFunction } from "express";
import { APIError, ClientError, ServerError } from "./Error";
import { isAuthError } from "@supabase/supabase-js";
import { isPostgrestError } from "./checkError";

export function handleError(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof ClientError) {
        const { message, details } = error;
        res.status(error.statusCode).json({ type: "Client Error", error: { message, details } });
        return;
    }

    if (error instanceof APIError) {
        // add middleware to log these types of errors to us.
        const { message, details } = error;
        res.status(error.statusCode).json({ type: "API Error", error: { message, details } });
        return;
    }

    if (error instanceof ServerError) {
        // add middleware to log these types of errors to us.
        const { message } = error;
        res.status(error.statusCode).json({ type: "Server Error", error: { message } });
        return;
    }

    if (isAuthError(error) || isPostgrestError(error)) {
        if (error?.code?.includes("116")) {
            res.status(404).json({ type: "Supabase Error", error: { message: "The resource does not exist." }});
            return;
        }
        // add middleware to log these types of errors to us.
        res.status(403).json({ type: "Supabase Error", error: { message: "Something went wrong fetching the data." }});
        return;
    }

    res.status(500).json({ type: "Unknown Error", error: { message: "An unknown error occurred." } });
    return;
}