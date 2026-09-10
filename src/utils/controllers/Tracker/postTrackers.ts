import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { createTracker } from "./Tracker";
import { TrackersPostBodyParams } from "./trackers.types";

export async function postTrackers(
    req: Request<any, unknown, TrackersPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with creating the tracker.", err: result.array() });
        return;
    }

    const { pattern_id, title, current_row, current_stitch, current_index, is_finished } = req.body;

    try {
        const data = await createTracker(pattern_id, title, current_row, current_stitch, current_index, is_finished);
        res.status(201).json({ message: "Tracker successfully created!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with creating the tracker.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}