import { query } from 'express-validator';

export const searchValidator = [
    query('q')
        .trim()
        .notEmpty()
        .withMessage('q is required.')
        .isLength({ max: 100 })
        .withMessage('q cannot exceed 100 characters.'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 25 })
        .withMessage('limit must be between 1 and 25.'),
];
