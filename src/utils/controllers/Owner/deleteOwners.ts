import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { removeOwner } from "./Owner";
import { OwnerDeleteRouteParams } from "./owners.types";

export async function deleteOwners(
    req: Request<OwnerDeleteRouteParams>, 
    res: Response
): Promise<void> {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with removing ownership.", error: result.array() });
        return;
    }

    const { user_pattern_id } = req.params;

    try {
        if (user_pattern_id === "") {
            res.status(400).json({ message: "Something went wrong with removing ownership.", error: "id field is missing or invalid." });
            return;
        }

        await removeOwner(user_pattern_id);
        res.sendStatus(204);
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with removing ownership.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}