import { NextFunction, Request, Response } from 'express';

export function logoutUser(req: Request, res: Response, next: NextFunction) {
    req.logout((error) => {
        if (error) {
            next(error);
            return;
        }

        req.session.destroy((sessionError) => {
            if (sessionError) {
                next(sessionError);
                return;
            }

            res.clearCookie('connect.sid');
            res.sendStatus(204);
        });
    });
}
