import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { deleteStitch } from '../../services/stitchServices';
import { StitchesDeleteRouteParams } from './stitches.types';
import { ClientError } from '../../errors/Error';

export async function deleteStitches(
    req: Request<StitchesDeleteRouteParams>,
    res: Response,
): Promise<void> {
    const { id } = req.params;
    const userId = sessionUser(req);

    if (!id) throw new ClientError('Missing id parameter.', 400);

    await deleteStitch({ userId, id });
    res.sendStatus(204);
}
