import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { getAllPatterns, getPattern } from "./Pattern";
import { PatternGetRouteParams, PatternGetQueryParams } from "./pattern.types";
import { handlePagination } from "../../tools/handlePagination";
import { ClientError } from "../../errors/Error";

export async function getPatterns(
    req: Request<PatternGetRouteParams, unknown, unknown, PatternGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);
    
    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the patterns request.", 400, result.array());

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