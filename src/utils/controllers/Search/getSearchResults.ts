import { Request, Response } from 'express';

import { searchUserData } from '../../services/searchServices';
import { sessionUser } from '../User/sessionUser';
import { SearchQueryParams } from './search.types';

export async function getSearchResults(
    req: Request<unknown, unknown, unknown, SearchQueryParams>,
    res: Response,
): Promise<void> {
    const { q, limit: requestedLimit } = req.query;
    const userId = sessionUser(req);
    const limit = requestedLimit ? Number(requestedLimit) : 10;
    const data = await searchUserData({ userId, searchTerm: q, limit });

    res.status(200).json({ message: 'Search completed!', data });
}
