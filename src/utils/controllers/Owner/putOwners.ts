import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { editOwner } from "../../services/ownerServices";
import { OwnerPutRouteParams, OwnerPutBodyParams } from "./owners.types";

export async function putOwners(
    req: Request<OwnerPutRouteParams, unknown, OwnerPutBodyParams>, 
    res: Response
) {
    const { user_pattern_id } = req.params;
    const { user_id, pattern_id, message } = req.body;
    const session = sessionUser(res);

    const data = await editOwner(session, user_pattern_id, pattern_id, user_id, message);
    res.status(200).json({ message: "Successfully edited ownership!", data });
}