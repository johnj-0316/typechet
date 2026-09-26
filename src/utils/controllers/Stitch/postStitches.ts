import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { createStitch } from "./Stitch";
import { StitchesPostBodyParams } from "./stitches.types";
import { ClientError } from "../../errors/Error";

export async function postStitches(
    req: Request<any, unknown, StitchesPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the stitches request.", 400, result.array());

    const { shorthand, name, origin } = req.body;
    const session = sessionUser(res);
    const data = await createStitch(session, shorthand, name, origin);

    res.status(201).json({ message: "Stitch succesfully created!", data });
}