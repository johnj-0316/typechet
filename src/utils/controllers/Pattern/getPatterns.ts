import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { getAllPatterns, getPattern } from "../../services/patternServices";
import { PatternGetRouteParams, PatternGetQueryParams } from "./pattern.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getPatterns(
    req: Request<PatternGetRouteParams, unknown, unknown, PatternGetQueryParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const { offset, limit } = req.query;
    const session = sessionUser(res);

    //pq should throw error on faulty values
    const pq = handlePagination(offset, limit);
    const data = id ?
    await getPattern(session, id)
    : await getAllPatterns(session, pq.offset, pq.limit);
    
    res.status(200).json({ message: "Found patterns!", data });
}