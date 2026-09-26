import { validationResult } from "express-validator";
import { Request, Response } from "express";

import { signIn } from "./User";
import { ClientError } from "../../errors/Error";

export async function loginUser(
    req: Request, 
    res: Response
): Promise<void> {
    // result will not be empty if something goes wrong.
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with logging in.", 400, result.array());

    //supabase autohashes, otherwise use bcrypt
    const { email } = req.body;
    const auth = await signIn(email, req.body?.password);
    res.status(200).json({ message: "User logged in!", auth });
}