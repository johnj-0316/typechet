import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { createStitch } from "./Stitch";
import { StitchesPostBodyParams } from "./stitches.types";

export async function postStitches(
    req: Request<any, unknown, StitchesPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with creating the stitch.", error: result.array() });
        return;
    }

    const { shorthand, name, origin } = req.body;

    try {
        const data = await createStitch(shorthand, name, origin || "US");
        res.status(200).json({ message: "Stitch succesfully created!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with creating the stitch.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}