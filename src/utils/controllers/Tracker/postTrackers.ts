import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { createTracker } from "./Tracker";
import { TrackersPostBodyParams } from "./trackers.types";
import { ClientError } from "../../errors/Error";

export async function postTrackers(
    req: Request<any, unknown, TrackersPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the request.", 400, result.array());

    const { pattern_id, title, current_row, current_stitch, current_index, is_finished } = req.body;
    const session = sessionUser(res);
    const data = await createTracker(session, pattern_id, current_row, current_index, is_finished, title, current_stitch);
    
    res.status(201).json({ message: "Tracker successfully created!", data });
}