import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { getUserStitches, getUserStitch } from "./Stitch";
import { StitchesGetRouteParams, StitchesGetQueryParams } from "./stitches.types";
import { handlePagination } from "../../tools/handlePagination";
import { ClientError } from "../../errors/Error";

export async function getStitches(
    req: Request<StitchesGetRouteParams, unknown, unknown, StitchesGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the stitches request.", 400, result.array());

    const { id } = req.params;
    const { offset, limit } = req.query;
    const session = sessionUser(res);

    const pq = handlePagination(offset, limit);
    const data = id ? 
        await getUserStitch(session, id) 
        : await getUserStitches(session, pq.offset, pq.limit);
    
    res.status(200).json({ message: "Found stitches!", data });
}