import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { PatternDeleteRouteParams } from "./pattern.types";
import { deletePattern } from "../../services/patternServices";
import { ClientError } from "../../errors/Error";

export async function deletePatterns(
    req: Request<PatternDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const session = sessionUser(res);

    if (!id)
        throw new ClientError("Missing id parameter.", 400);

    await deletePattern(session, id);
    res.sendStatus(204);
}