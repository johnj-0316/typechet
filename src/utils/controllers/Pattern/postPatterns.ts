import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { createPattern } from "./Pattern";
import { PatternPostBodyParams } from "./pattern.types";

export async function postPatterns(
    req: Request<any, unknown, PatternPostBodyParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with saving the pattern.", err: result.array() });
        return;
    }

    const { title, rows } = req.body;

    try {
        const data = await createPattern(title, rows);
        res.status(201).json({ message: "Pattern successfully saved!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with saving the pattern.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}