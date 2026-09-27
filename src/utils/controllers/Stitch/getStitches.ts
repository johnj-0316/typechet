import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { getUserStitches, getUserStitch } from "../../services/stitchServices";
import { StitchesGetRouteParams, StitchesGetQueryParams } from "./stitches.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getStitches(
    req: Request<StitchesGetRouteParams, unknown, unknown, StitchesGetQueryParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const { offset, limit } = req.query;
    const session = sessionUser(res);

    const pq = handlePagination(offset, limit);
    const data = id ? 
        await getUserStitch(session, id) 
        : await getUserStitches(session, pq.offset, pq.limit);
    
    res.status(200).json({ message: "Found stitches!", data });
}