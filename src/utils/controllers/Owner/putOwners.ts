import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { editOwner } from "./Owner";
import { OwnerPutRouteParams, OwnerPutBodyParams } from "./owners.types";

export async function putOwners(
    req: Request<OwnerPutRouteParams, unknown, OwnerPutBodyParams>, 
    res: Response
) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong editing ownership.", error: result.array() });
        return;
    }

    const { user_pattern_id } = req.params;
    const { user_id, pattern_id, message } = req.body;

    try {
        const data = await editOwner(user_pattern_id, pattern_id, user_id, message);
        res.status(200).json({ message: "Successfully edited ownership!", data });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong editing ownership.", err: err.message });
        } 
        else {
            res.status(500).json({ message: "An unexpected error has occured.", err });
        }
    }
}