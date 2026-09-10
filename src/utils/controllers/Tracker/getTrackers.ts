import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { getUserTrackers, getUserTracker } from "./Tracker";
import { TrackersGetRouteParams, TrackersGetQueryParams } from "./trackers.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getTrackers(
    req: Request<TrackersGetRouteParams, unknown, unknown, TrackersGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with getting the trackers.", error: result.array() });
        return;
    }

    const { id } = req.params;
    const { page, limit } = req.query;

    try {
        const pq = handlePagination(page, limit);
        const data = id ? 
            await getUserTracker(id) 
            : await getUserTrackers(pq.offset, pq.limit);

        if (!data || (Array.isArray(data) && !data.length)) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json({ message: "Found all trackers!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with getting the trackers.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}