import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { deleteStitch } from "./Stitch";
import { StitchesDeleteRouteParams } from "./stitches.types";

export async function deleteStitches(
    req: Request<StitchesDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with deleting the stitch.", error: result.array() });
        return;
    }

    const { id } = req.params;

    try {
        if (id === "") {
            res.status(400).json({ message: "Something went wrong with deleting the stitch.", error: "stitch_id field is required." });
            return;
        }

        await deleteStitch(id);
        res.sendStatus(204);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with deleting the stitch.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}