import { Response } from "express";

import { UserAuthContext } from "./users.types";

// each request on protected routes needs an auth header with the jwt

export function sessionUser(
    res: Response
): UserAuthContext {
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