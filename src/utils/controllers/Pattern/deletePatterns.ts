import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { PatternRouteParams } from "./pattern.types";
import { deletePattern } from "./Pattern";

export async function deletePatterns(
    req: Request<PatternRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with deleting the pattern.", error: result.array() });
        return;
    }

    const { id } = req.params;

    try {
        if (id === undefined || id === null) {
            res.status(400).json({ message: "Something went wrong with deleting the pattern.", error: "id field is required." });
            return;
        }

        await deletePattern(id);
        res.sendStatus(204);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with deleting the pattern.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}