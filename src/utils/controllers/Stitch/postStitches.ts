import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { createStitch } from "./Stitch";
import { StitchesPostBodyParams } from "./stitches.types";

export async function postStitches(
    req: Request<any, unknown, StitchesPostBodyParams>, 
    res: Response
): Promise<void> {
    const { shorthand, name, origin } = req.body;
    const session = sessionUser(res);
    
    const data = await createStitch(session, shorthand, name, origin);
    res.status(201).json({ message: "Stitch succesfully created!", data });
}