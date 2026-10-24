import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { createTracker } from '../../services/trackerServices';
import { TrackersPostBodyParams } from './trackers.types';

export async function postTrackers(
    req: Request<unknown, unknown, TrackersPostBodyParams>,
    res: Response,
): Promise<void> {
    const { pattern_id, title, current_row, current_stitch, current_index } = req.body;
    const userId = sessionUser(req);

    const data = await createTracker(
        userId,
        pattern_id,
        current_row,
        current_index,
        title,
        current_stitch,
    );
    res.status(201).json({ message: 'Tracker successfully created!', data });
}
