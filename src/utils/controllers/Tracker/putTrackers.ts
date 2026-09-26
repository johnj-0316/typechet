import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { editTracker } from "./Tracker";
import { TrackersPutRouteParams, TrackersPutBodyParams } from "./trackers.types";

export async function putTrackers(
    req: Request<TrackersPutRouteParams, unknown, TrackersPutBodyParams>, 
    res: Response
) {
    const { id } = req.params;
    const { title, current_row, current_stitch, current_index, is_finished } = req.body;
    const session = sessionUser(res);
    
    const data = await editTracker(session, id, current_row, current_index, is_finished, title, current_stitch);
    res.status(200).json({ message: "Successfully edited the tracker!", data });
}