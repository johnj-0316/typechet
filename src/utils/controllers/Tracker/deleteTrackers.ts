import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { deleteTracker } from "./Tracker";
import { TrackersDeleteRouteParams } from "./trackers.types";
import { ClientError } from "../../errors/Error";

export async function deleteTrackers(
    req: Request<TrackersDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the request.", 400, result.array());

    const { id } = req.params;
    const session = sessionUser(res);

    if (!id)
        throw new ClientError("Missing id parameter.", 400);

    await deleteTracker(session, id);
    res.sendStatus(204);
}