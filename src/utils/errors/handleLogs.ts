import { Request, Response, NextFunction } from "express";

export function handleLogs(req: Request, res: Response, next: NextFunction) {
    req.on("finish", () => {
        // if req is bad
        if (res.statusCode >= 400) {
            console.error({
                type: "API Error",
                path: req.path,
                method: req.method,
                userId: res.locals["auth"]?.user?.id ?? null,
            });
        }
    });

    next();
}