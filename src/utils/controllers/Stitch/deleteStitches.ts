import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { deleteStitch } from "./Stitch";
import { StitchesDeleteRouteParams } from "./stitches.types";
import { ClientError } from "../../errors/Error";

export async function deleteStitches(
    req: Request<StitchesDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the stitches request.", 400, result.array());

    const { id } = req.params;
    const session = sessionUser(res);

    if (!id)
        throw new ClientError("Missing id parameter.", 400);

    await deleteStitch(session, id);
    res.sendStatus(204);
}