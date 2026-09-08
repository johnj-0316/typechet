import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { getAllOwners, getOwnerByPattern } from "./Owner";
import { OwnerGetRouteParams, OwnerGetQueryParams } from "./owners.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getOwners(
    req: Request<OwnerGetRouteParams, unknown, unknown, OwnerGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with getting the owners.", error: result.array() });
        return;
    }

    const { pattern_id } = req.params;
    const { page, limit } = req.query;

    try {
        const pq = handlePagination(page, limit);
        const data = pattern_id ? 
            await getOwnerByPattern(pattern_id, pq.offset, pq.limit) 
            : await getAllOwners(pq.offset, pq.limit);

        if (!data.length) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json({ message: "Found all owners!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with getting the owners.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}