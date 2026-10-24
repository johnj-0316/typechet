import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { editTracker } from '../../services/trackerServices';
import { TrackersPutRouteParams, TrackersPutBodyParams } from './trackers.types';

export async function putTrackers(
    req: Request<TrackersPutRouteParams, unknown, TrackersPutBodyParams>,
    res: Response,
) {
    const { id } = req.params;
    const { title, current_row, current_stitch, current_index } = req.body;
    const userId = sessionUser(req);

    const data = await editTracker(userId, id, current_row, current_index, title, current_stitch);
    res.status(200).json({ message: 'Successfully edited the tracker!', data });
}
