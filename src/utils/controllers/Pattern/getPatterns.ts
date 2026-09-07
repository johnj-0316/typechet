import { Request, Response } from "express";

import { getAllPatterns, getPattern } from "./Pattern";
import { PatternGetRouteParams, PatternGetQueryParams } from "./pattern.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getPatterns(
    req: Request<PatternGetRouteParams, unknown, unknown, PatternGetQueryParams>, 
    res: Response
): Promise<void> {
    const { id } = req.params;
    const { page, limit } = req.query;

    try {
        //pq should throw error on faulty values
        const pq = handlePagination(page, limit);
        const data = id ? await getPattern(id) : await getAllPatterns(pq.offset, pq.limit);
        res.status(200).json({ message: "Found patterns!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with getting your patterns.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}