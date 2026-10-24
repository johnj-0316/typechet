import { Request, Response } from 'express';

import { sessionUser } from '../User/sessionUser';
import { getAllPatterns, getPattern } from '../../services/patternServices';
import { PatternGetRouteParams, PatternGetQueryParams } from './pattern.types';
import { handlePagination } from '../../tools/handlePagination';

export async function getPatterns(
    req: Request<PatternGetRouteParams, unknown, unknown, PatternGetQueryParams>,
    res: Response,
): Promise<void> {
    const { id } = req.params;
    const { offset, limit } = req.query;
    const userId = sessionUser(req);

    //pq should throw error on faulty values
    const pq = handlePagination(offset, limit);
    const data = id
        ? await getPattern(userId, id)
        : await getAllPatterns(userId, pq.offset, pq.limit);

    res.status(200).json({ message: 'Found patterns!', data });
}
