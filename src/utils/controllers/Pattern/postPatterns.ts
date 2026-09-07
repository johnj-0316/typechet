import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { createPattern } from "./Pattern";

export async function postPatterns(
    req: Request, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with saving the pattern", err: result.array() });
        return;
    }

    const { title, rows, colors, sizes, materials } = req.body;

    try {
        const data = await createPattern(title, rows, colors, sizes, materials);
        res.status(201).json({ message: "Pattern successfully saved!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with saving the pattern", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}