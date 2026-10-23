import { Request, Response } from "express";

import { APIError } from "../../errors/Error";
import { editUserProfile } from "../../services/userServices";
import { UsersPostRouteBody } from "./users.types";

export async function editUser(
    req: Request<unknown, unknown, UsersPostRouteBody>, 
    res: Response
): Promise<void> {
    const { name, displayName, profileUrl, phone } = req.body;
    const user = await editUserProfile(req.user!.uid, name, displayName, profileUrl, phone);
    
    if (!user)
        throw new APIError("Profile was not found!", 404);

    res.status(200).json({ message: "Edited user profile!", user });
}
