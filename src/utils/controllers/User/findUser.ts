import { Request, Response } from "express";

import { getUser } from "./User";

export async function findUser(
    req: Request, 
    res: Response
): Promise<void> {
    try {
        const user = await getUser();

        if (!user) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json({message: "Found user profile", user});
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