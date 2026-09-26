import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { editStitch } from "./Stitch";
import { StitchesPutRouteParams, StitchesPutBodyParams } from "./stitches.types";
import { ClientError } from "../../errors/Error";

export async function putStitches(
    req: Request<StitchesPutRouteParams, unknown, StitchesPutBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the stitches request.", 400, result.array());


    const { id } = req.params;
    const { shorthand, name, origin } = req.body;
    const session = sessionUser(res);
    const data = await editStitch(session, id, shorthand, name, origin);
        
    res.status(200).json({ message: "Successfully edited stitch!", data });
}