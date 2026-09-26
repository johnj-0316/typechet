import { Request, Response, NextFunction } from "express";
import { createSupabaseClient } from "../../../db/createSupabaseClient";

import { UsersReqHeaderParams } from "./users.types";
import { APIError } from "../../errors/Error";

// each request on protected routes needs an auth header with the jwt

export async function authUser(
    req: Request, 
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers as UsersReqHeaderParams;
    const token = getToken(authorization);

    if (!token)
        throw new APIError("Missing session token.", 401);

    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user)
        throw new APIError("Invalid or expired token.", 401);

    res.locals["supabase"] = supabase;
    res.locals["auth"] = data;

    next();
}

function getToken(authorizationHeader: string) {
    if (!authorizationHeader.startsWith("Bearer "))
        return null;

    return authorizationHeader.split(" ")[1];
}