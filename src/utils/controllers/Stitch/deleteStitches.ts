import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { deleteStitch } from "./Stitch";
import { StitchesDeleteRouteParams } from "./stitches.types";
import { ClientError } from "../../errors/Error";

export async function deleteStitches(
    req: Request<StitchesDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const session = sessionUser(res);

    if (!id)
        throw new ClientError("Missing id parameter.", 400);

    await deleteStitch(session, id);
    res.sendStatus(204);
}