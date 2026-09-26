import { validationResult } from "express-validator";
import { Request, Response } from "express";

import { signUp } from "./User"
import { ClientError } from "../../errors/Error";

export async function registerUser(
    req: Request, 
    res: Response
): Promise<void> {
    // result will not be empty if something goes wrong.
    const result = validationResult(req);

    if (!result.isEmpty())
        throw new ClientError("Something went wrong with registering.", 400, result.array());

    //supabase autohashes, otherwise use bcrypt
    const { username, email } = req.body;
    const user = await signUp(username, email, req.body?.password);
    res.status(201).json({ message: "User registered!", user });
}