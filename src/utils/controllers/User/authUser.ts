import { Request, Response, NextFunction } from "express";
import { createSupabaseClient } from "../../../db/createSupabaseClient";

import { UsersReqHeaderParams } from "./users.types";

// each request on protected routes needs an auth header with the jwt

export async function authUser(
    req: Request, 
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers as UsersReqHeaderParams;
    const token = getToken(authorization);

    if (!token) {
        res.status(401).json({ message: "Missing session token." });
        return;
    }

    const supabase = createSupabaseClient(token);
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        res.status(401).json({ message: "Invalid or expired token." });
        return;
    }

    res.locals["supabase"] = supabase;
    res.locals["auth"] = data;

    next();
}

function getToken(authorizationHeader: string) {
    return authorizationHeader.split(" ")[1];
}