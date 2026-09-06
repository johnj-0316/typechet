import { validationResult } from "express-validator";
import { Request, Response } from "express";

import { signUp } from "./User"

export async function registerUser(
    req: Request, 
    res: Response
): Promise<void> {
    // result will not be empty if something goes wrong.
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with the input.", error: result.array() });
        return;
    }

    //supabase autohashes, otherwise use bcrypt
    const { username, email } = req.body;

    try {
        const user = await signUp(username, email, req.body?.password);
        res.status(201).json({ message: "User registered!", user });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with registration.", error: err.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }
    }
}