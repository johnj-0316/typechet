import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { createStitch } from '../../services/stitchServices';
import { StitchesPostBodyParams } from './stitches.types';

export async function postStitches(
    req: Request<unknown, unknown, StitchesPostBodyParams>,
    res: Response,
): Promise<void> {
    const { shorthand, name, origin } = req.body;
    const userId = sessionUser(req);

    const data = await createStitch(userId, shorthand, name, origin);
    res.status(201).json({ message: 'Stitch successfully created!', data });
}
