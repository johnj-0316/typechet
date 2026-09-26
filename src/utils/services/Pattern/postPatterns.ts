import { Request, Response } from "express";

import { sessionUser } from "../User/sessionUser";
import { createPattern } from "./patternServices";
import { PatternPostBodyParams } from "./pattern.types";

export async function postPatterns(
    req: Request<unknown, unknown, PatternPostBodyParams>, 
    res: Response
): Promise<void> {
    const { title, rows, is_editing } = req.body;
    const session = sessionUser(res);
    
    const data = await createPattern(session, title, rows, is_editing);
    res.status(201).json({ message: "Pattern successfully saved!", data });
}