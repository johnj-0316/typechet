import { NextFunction, Request, Response } from 'express';

import { createUser } from '../../services/userServices';

export async function registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, email, password } = req.body;
    const user = await createUser({ username, email, password });

    req.login(user, (error) => {
        if (error) {
            next(error);
            return;
        }

        res.status(201).json({
            message: 'User registered!',
            user,
        });
    });
}
