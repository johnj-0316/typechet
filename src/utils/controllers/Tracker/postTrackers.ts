import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { createTracker } from "./Tracker";
import { TrackersPostBodyParams } from "./trackers.types";

export async function postTrackers(
    req: Request<any, unknown, TrackersPostBodyParams>, 
    res: Response
): Promise<void> {
    const { pattern_id, title, current_row, current_stitch, current_index, is_finished } = req.body;
    const session = sessionUser(res);
    
    const data = await createTracker(session, pattern_id, current_row, current_index, is_finished, title, current_stitch);
    res.status(201).json({ message: "Tracker successfully created!", data });
}