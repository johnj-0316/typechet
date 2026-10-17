import { Request, Response, NextFunction } from "express";

import { APIError } from "../../errors/Error";

export function authUser(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    if (!req.isAuthenticated() || !req.user) {
        next(new APIError("Authentication required.", 401));
        return;
    }

    next();
}
