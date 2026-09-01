import { validationResult } from "express-validator";
import { Request, Response } from "express";

import { User } from "./User";

export async function loginUser(req: Request, res: Response) {
    // result will not be empty if something goes wrong.
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ message: "Something went wrong with the input.", error: result.array() });
        return;
    }

    //supabase autohashes, otherwise use bcrypt
    const { email, password }: User = req.body;

    try {
        const user = new User("", email, password);
        await user.signIn();
        res.status(200).json({ message: "User logged in!", user });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with logging in.", error: err.message })
        }
        else {
            res.status(500).json({ message: "An unexpected error occured." });
        }
    }
}