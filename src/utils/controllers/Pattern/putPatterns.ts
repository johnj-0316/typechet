import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { editPattern } from "../../services/patternServices";
import { PatternPutRouteParams, PatternPutBodyParams } from "./pattern.types";

// finish frontend form first

export async function putPatterns(
    req: Request<PatternPutRouteParams, unknown, PatternPutBodyParams>,
    res: Response
) {
    const { id } = req.params;
    const { title, rows, is_editing, description } = req.body;
    const userId = sessionUser(req);
    
    const data = await editPattern(userId, id, title, rows, is_editing, description);
    res.status(200).json({ message: "Pattern successfully edited!", data });
}
