import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { getUserStitches, getUserStitch } from "./Stitch";
import { StitchesGetRouteParams, StitchesGetQueryParams } from "./stitches.types";
import { handlePagination } from "../../tools/handlePagination";

export async function getStitches(
    req: Request<StitchesGetRouteParams, unknown, unknown, StitchesGetQueryParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with getting the stitches.", error: result.array() });
        return;
    }

    const { id } = req.params;
    const { page, limit } = req.query;

    try {
        const pq = handlePagination(page, limit);
        const data = id ? 
            await getUserStitch(id) 
            : await getUserStitches(pq.offset, pq.limit);

        if (!data || (Array.isArray(data) && !data.length)) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json({ message: "Found stitches!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with getting the stitches.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}