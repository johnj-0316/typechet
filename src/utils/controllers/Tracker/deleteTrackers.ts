import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { deleteTracker } from "../../services/trackerServices";
import { TrackersDeleteRouteParams } from "./trackers.types";
import { ClientError } from "../../errors/Error";

export async function deleteTrackers(
    req: Request<TrackersDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const userId = sessionUser(req);

    if (!id)
        throw new ClientError("Missing id parameter.", 400);

    await deleteTracker(userId, id);
    res.sendStatus(204);
}
