import { Request, Response } from "express";

import { signUp } from "../../services/userServices"

export async function registerUser(
    req: Request, 
    res: Response
): Promise<void> {
    //supabase autohashes, otherwise use bcrypt
    const { username, email } = req.body;
    const user = await signUp(username, email, req.body?.password);
    res.status(201).json({ message: "User registered!", user });
}