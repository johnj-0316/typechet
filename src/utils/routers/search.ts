import { Router } from 'express';

import { getSearchResults } from '../controllers/Search/getSearchResults';
import { validate } from '../validators/validate';
import { searchValidator } from '../validators/route/searchValidator';

export const searchRouter = Router();

searchRouter.get(
    '/',
    searchValidator,
    validate('Something went wrong with the search request.'),
    getSearchResults,
);
