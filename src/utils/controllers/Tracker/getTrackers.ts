import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { getUserTrackers, getUserTracker } from '../../services/trackerServices';
import { TrackersGetRouteParams, TrackersGetQueryParams } from './trackers.types';
import { handlePagination } from '../../tools/handlePagination';

export async function getTrackers(
    req: Request<TrackersGetRouteParams, unknown, unknown, TrackersGetQueryParams>,
    res: Response,
): Promise<void> {
    const { id } = req.params;
    const { offset, limit } = req.query;
    const userId = sessionUser(req);

    const pq = handlePagination(offset, limit);
    const trackerData = id
        ? await getUserTracker({ userId, id })
        : await getUserTrackers({ userId, offset: pq.offset, limit: pq.limit });

    res.status(200).json({ message: 'Found all trackers!', data: trackerData });
}
