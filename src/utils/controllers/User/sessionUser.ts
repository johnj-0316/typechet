import { Response } from "express";

import { UserAuthContext } from "./users.types";
import { APIError } from "../../errors/Error";

// each request on protected routes needs an auth header with the jwt

export function sessionUser(
    res: Response
): UserAuthContext {
    if (!("supabase" in res.locals) || !("auth" in res.locals))
        throw new APIError("Missing locals objects!", 401);

    const { supabase, auth: { user } } = res.locals;
    const session: UserAuthContext = {
        supabase,
        userId: user.id
    };
    return session;
}

function getToken(authorizationHeader: string) {
    return authorizationHeader.split(" ")[1];
}