import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { getUserTrackers, getUserTracker } from "./Tracker";
import { TrackersGetRouteParams, TrackersGetQueryParams } from "./trackers.types";
import { handlePagination } from "../../tools/handlePagination";
import { ClientError } from "../../errors/Error";

export async function getTrackers(
    req: Request<TrackersGetRouteParams, unknown, unknown, TrackersGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the trackers request.", 400, result.array());

    const { id } = req.params;
    const { offset, limit } = req.query;
    const session = sessionUser(res);

    const pq = handlePagination(offset, limit);
    const data = id ? 
        await getUserTracker(session, id) 
        : await getUserTrackers(session, pq.offset, pq.limit);
    
    res.status(200).json({ message: "Found all trackers!", data });
}