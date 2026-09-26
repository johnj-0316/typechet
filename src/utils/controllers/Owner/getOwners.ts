import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { getAllOwners, getOwnerByPattern } from "./Owner";
import { OwnerGetRouteParams, OwnerGetQueryParams } from "./owners.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getOwners(
    req: Request<OwnerGetRouteParams, unknown, unknown, OwnerGetQueryParams>, 
    res: Response
): Promise<void> {
    const { pattern_id } = req.params;
    const { offset, limit } = req.query;
    const session = sessionUser(res);
    const pq = handlePagination(offset, limit);
    
    const data = pattern_id ? 
        await getOwnerByPattern(session, pattern_id, pq.offset, pq.limit) 
        : await getAllOwners(session, pq.offset, pq.limit);

    res.status(200).json({ message: "Found all owners!", data });
}