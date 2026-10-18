import rateLimit from "express-rate-limit";

export const registerLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: {
        error: {
            message: "Too many attempts for registration. Try again later."
        }
    }
});