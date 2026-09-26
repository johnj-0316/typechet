import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { editStitch } from "./stitchServices";
import { StitchesPutRouteParams, StitchesPutBodyParams } from "./stitches.types";

export async function putStitches(
    req: Request<StitchesPutRouteParams, unknown, StitchesPutBodyParams>, 
    res: Response
): Promise<void> {

    const { id } = req.params;
    const { shorthand, name, origin } = req.body;
    const session = sessionUser(res);
    
    const data = await editStitch(session, id, shorthand, name, origin);
    res.status(200).json({ message: "Successfully edited stitch!", data });
}