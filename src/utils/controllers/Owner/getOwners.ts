import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { getAllOwners, getOwnerByPattern } from "../../services/ownerServices";
import { OwnerGetRouteParams, OwnerGetQueryParams } from "./owners.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getOwners(
    req: Request<OwnerGetRouteParams, unknown, unknown, OwnerGetQueryParams>, 
    res: Response
): Promise<void> {
    const { pattern_id } = req.params;
    const { offset, limit } = req.query;
    const userId = sessionUser(req);
    const pq = handlePagination(offset, limit);
    
    const data = pattern_id ? 
        await getOwnerByPattern(userId, pattern_id, pq.offset, pq.limit)
        : await getAllOwners(userId, pq.offset, pq.limit);

    res.status(200).json({ message: "Found all owners!", data });
}
