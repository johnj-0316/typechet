import { Request, Response, NextFunction } from "express";

import { allowedOrigins, safeMethods } from "./allowed";

// Reject state-changing browser requests from untrusted origins.
export function validateOrigin(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (safeMethods.has(req.method)) {
        next();
        return;
    }

    // get req origin and make sure its allowed (from our env)
    const origin = req.get("Origin");

    if (!origin || !allowedOrigins.has(origin)) {
        res.status(403).json({
            error: {
                message: "Untrusted request origin.",
            },
        });
        return;
    }

    next();
}
