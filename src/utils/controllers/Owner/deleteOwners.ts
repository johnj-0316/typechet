import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { deleteOwner } from "./Owner";
import { OwnerDeleteRouteParams } from "./owners.types";
import { ClientError } from "../../errors/Error";

export async function deleteOwners(
    req: Request<OwnerDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const { user_pattern_id } = req.params;
    const session = sessionUser(res);

    if (!user_pattern_id)
        throw new ClientError("Missing id parameter.", 400);

    await deleteOwner(session, user_pattern_id);
    res.sendStatus(204);
}