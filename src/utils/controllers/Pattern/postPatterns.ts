import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { sessionUser } from "../User/sessionUser";
import { createPattern } from "./Pattern";
import { PatternPostBodyParams } from "./pattern.types";
import { ClientError } from "../../errors/Error";

export async function postPatterns(
    req: Request<any, unknown, PatternPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with the patterns request.", 400, result.array());

    const { title, rows, is_editing } = req.body;
    const session = sessionUser(res);
    const data = await createPattern(session, title, rows, is_editing);

    res.status(201).json({ message: "Pattern successfully saved!", data });
}