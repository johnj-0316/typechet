import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { editPattern } from "./Pattern";
import { PatternPutRouteParams, PatternPutBodyParams } from "./pattern.types";

// finish frontend form first

export async function putPatterns(
    req: Request<PatternPutRouteParams, unknown, PatternPutBodyParams>,
    res: Response
) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with editing the pattern.", err: result.array() });
        return;
    }

    const { id } = req.params;
    const { title, rows, is_editing } = req.body;

    try {
        const data = await editPattern(id, title, rows, is_editing);
        res.status(201).json({ message: "Pattern successfully edited!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with editing the pattern.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}