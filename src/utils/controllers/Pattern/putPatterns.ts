import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { editPattern } from "./Pattern";
import { PatternPutRouteParams, PatternPutBodyParams } from "./pattern.types";
import { ClientError } from "../../errors/Error";

// finish frontend form first

export async function putPatterns(
    req: Request<PatternPutRouteParams, unknown, PatternPutBodyParams>,
    res: Response
) {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the patterns request.", 400, result.array());

    const { id } = req.params;
    const { title, rows, is_editing } = req.body;
    const session = sessionUser(res);
    const data = await editPattern(session, id, title, rows, is_editing);
        
    res.status(201).json({ message: "Pattern successfully edited!", data });
}