import { Request, Response } from "express";

import { signIn } from "./User";

export async function loginUser(
    req: Request, 
    res: Response
): Promise<void> {
    //supabase autohashes, otherwise use bcrypt
    const { email } = req.body;
    const auth = await signIn(email, req.body?.password);
    res.status(200).json({ message: "User logged in!", auth });
}