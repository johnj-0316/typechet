import { Request, Response } from "express";

import { User } from "./User";

export async function findUser(req: Request, res: Response) {
    try {
        const profile = await User.getUser();

        if (!profile) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json({message: "Found user profile", profile});
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: "Something went wrong with logging in.", error: err.message });
        }
        else {
            res.status(500).json({ message: "An unexpected error occured", error: err });
        }
    }
}