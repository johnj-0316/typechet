import rateLimit from 'express-rate-limit';

export const profileLimit = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10,
    keyGenerator: (req) => req.user!.uid,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    message: {
        error: {
            message: 'Too many requests for editing your profile. Try again later.',
        },
    },
});
