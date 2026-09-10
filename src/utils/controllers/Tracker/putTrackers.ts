import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { editTracker } from "./Tracker";
import { TrackersPutRouteParams, TrackersPutBodyParams } from "./trackers.types";

export async function putTrackers(
    req: Request<TrackersPutRouteParams, unknown, TrackersPutBodyParams>, 
    res: Response
) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong editing the tracker.", error: result.array() });
        return;
    }

    const { id } = req.params;
    const { title, current_row, current_stitch, current_index, is_finished } = req.body;

    try {
        const data = await editTracker(id, title, current_row, current_stitch, current_index, is_finished);
        res.status(200).json({ message: "Successfully edited the tracker!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong editing the tracker.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}