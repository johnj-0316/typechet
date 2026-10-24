import { Request, Response } from 'express';

export async function loginUser(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: 'User logged in!', user: req.user });
}
