import 'dotenv/config';

const configuredOrigins: string | undefined = process.env['ALLOWED_ORIGINS'];

if (!configuredOrigins) {
    throw new Error('ALLOWED_ORIGINS is not configured.');
}

const allowedOrigins = new Set(
    configuredOrigins
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
);

if (!allowedOrigins.size) {
    throw new Error('ALLOWED_ORIGINS must contain at least one origin.');
}

const safeMethods = new Set(['GET', 'HEAD', 'OPTIONS']);

export { allowedOrigins, safeMethods };
