import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import { pool } from '../db';

const PostgresStore = connectPgSimple(session);

export const DBStore = new PostgresStore({
    pool,
    tableName: 'user_sessions',
    createTableIfMissing: false,
});
