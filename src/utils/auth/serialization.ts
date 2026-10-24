import passport from 'passport';

import { findUserById } from '../services/userServices';
import { users } from '../../db/schema';

type CleanUser = Omit<typeof users.$inferSelect, 'hashedPassword'>;

declare global {
    namespace Express {
        interface User extends CleanUser {}
    }
}

passport.serializeUser((user: CleanUser, done) => {
    done(null, user.uid);
});

passport.deserializeUser(async (uid: string, done) => {
    try {
        const user = await findUserById(uid);

        if (!user) {
            done(null, false);
            return;
        }

        done(null, user);
    } catch (err) {
        done(err);
    }
});
