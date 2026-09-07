import { Request, Response } from "express";
import { validationResult } from "express-validator";

// finish frontend form first

export async function putPatterns(
    req: Request,
    res: Response
) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with editing the pattern.", err: result.array() });
        return;
    }
}