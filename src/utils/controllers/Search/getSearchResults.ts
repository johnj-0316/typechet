import { Request, Response } from 'express';

import { searchUserData } from '../../services/searchServices';
import { sessionUser } from '../User/sessionUser';
import { SearchQueryParams } from './search.types';

export async function getSearchResults(
    req: Request<unknown, unknown, unknown, SearchQueryParams>,
    res: Response,
): Promise<void> {
    const userId = sessionUser(req);
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const data = await searchUserData(userId, req.query.q, limit);

    res.status(200).json({ message: 'Search completed!', data });
}
