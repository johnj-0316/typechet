import { Request, Response } from "express";

import { sessionUser } from "./sessionUser";
import { getUser } from "../../services/userServices";
import { APIError } from "../../errors/Error";

export async function findUser(
    req: Request, 
    res: Response
): Promise<void> {
    const session = sessionUser(res);
    const user = await getUser(session.supabase, session.userId);
    
    if (!user)
        throw new APIError("User was not found!", 404);

    res.status(200).json({ message: "Found user profile!", user });
}