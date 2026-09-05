import { Request, Response } from "express";

import { getAllPatterns } from "./Pattern";

export async function getPatterns(req: Request, res: Response) {
    try {
        const data = await getAllPatterns();
        res.status(200).json({ message: "Found patterns: ", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with getting your patterns", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}