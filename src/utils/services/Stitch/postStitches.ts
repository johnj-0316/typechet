import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { createStitch } from "./stitchServices";
import { StitchesPostBodyParams } from "./stitches.types";

export async function postStitches(
    req: Request<unknown, unknown, StitchesPostBodyParams>, 
    res: Response
): Promise<void> {
    const { shorthand, name, origin } = req.body;
    const session = sessionUser(res);
    
    const data = await createStitch(session, shorthand, name, origin);
    res.status(201).json({ message: "Stitch successfully created!", data });
}