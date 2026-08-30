import { validationResult } from "express-validator";
import { Request, Response } from "express";

import { User } from "./User"

export async function registerUser(req: Request, res: Response) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with the input.", error: result.array() });
        return;
    }

    const { username, email, password }: User = req.body;

    try {
        const user = new User(username, email, password);
        await user.signUp();
        res.status(201).json({ message: "User registered!", user });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with registration.", error: err.message });
            return;
        } else {
            res.status(500).json({ message: "An unexpected error occurred." });
        }

    }
}