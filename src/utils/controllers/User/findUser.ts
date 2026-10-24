import { Request, Response } from 'express';

import { APIError } from '../../errors/Error';
import { findUserProfileById } from '../../services/userServices';

export async function findUser(req: Request, res: Response): Promise<void> {
    const user = await findUserProfileById(req.user!.uid);

    if (!user) throw new APIError('User was not found!', 404);

    res.status(200).json({ message: 'Found user profile!', user });
}
