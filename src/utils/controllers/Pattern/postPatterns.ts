import { Request, Response } from "express";

import { createPattern } from "./Pattern";

export async function postPattern(
    req: Request, 
    res: Response
) {
    const { rows, colors, sizes, materials } = req.body;

    try {
        const data = await createPattern(rows, colors, sizes, materials);
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