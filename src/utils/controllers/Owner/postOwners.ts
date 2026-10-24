import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { postOwner } from '../../services/ownerServices';
import { OwnerPostBodyParams } from './owners.types';

export async function postOwners(
    req: Request<unknown, unknown, OwnerPostBodyParams>,
    res: Response,
): Promise<void> {
    const { pattern_id, user_id, message } = req.body;
    const authenticatedUserId = sessionUser(req);

    const data = await postOwner(authenticatedUserId, pattern_id, user_id, message);
    res.status(201).json({ message: 'Owner successfully added!', data });
}
