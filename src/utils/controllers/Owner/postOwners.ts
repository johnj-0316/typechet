import { Request, Response } from "express";

import { postOwner } from "./Owner";
import { OwnerPostBodyParams } from "./owners.types";

export async function postOwners(
    req: Request<unknown, unknown, OwnerPostBodyParams>, 
    res: Response
): Promise<void> {
    const { pattern_id, user_id, message } = req.body;

    try {
        const data = await postOwner(pattern_id, user_id, message || null);
        res.status(200).json({ message: "Owner succesfully added!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with adding the owner.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}