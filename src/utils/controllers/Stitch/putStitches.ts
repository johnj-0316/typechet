import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { editStitch } from "./Stitch";
import { StitchesPutRouteParams, StitchesPutBodyParams } from "./stitches.types";

export async function putStitches(
    req: Request<StitchesPutRouteParams, unknown, StitchesPutBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with editing the stitch.", error: result.array() });
        return;
    }

    const { id } = req.params;
    const { shorthand, name, origin } = req.body;

    try {
        const data = await editStitch(id, shorthand, name, origin);
        res.status(200).json({ message: "Successfully edited stitch!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong editing the stitch.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}