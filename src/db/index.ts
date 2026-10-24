import 'dotenv/config';
import { env } from 'node:process';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

if (!env['DATABASE_URL']) {
    throw new Error('DATABASE_URL is not configured.');
}

export const pool = new Pool({
    connectionString: env['DATABASE_URL'],
});

export const db = drizzle(pool, { schema });
