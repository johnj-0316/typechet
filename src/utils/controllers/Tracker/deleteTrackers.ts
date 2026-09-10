import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { deleteTracker } from "./Tracker";
import { TrackersDeleteRouteParams } from "./trackers.types";

export async function deleteTrackers(
    req: Request<TrackersDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with deleting the tracker.", error: result.array() });
        return;
    }

    const { id } = req.params;

    try {
        if (id === "") {
            res.status(400).json({ message: "Something went wrong with deleting the tracker.", error: "id field is missing or invalid." });
            return;
        }

        await deleteTracker(id);
        res.sendStatus(204);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with deleting the tracker.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}