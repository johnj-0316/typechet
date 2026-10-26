# Typechet
## A Crochet Counter App
Crochet Counter is a full-stack application for organizing crochet patterns, tracking progress through pattern rows, managing yarn and supplies, and maintaining a personal stitch library.

The project is under active development. Its core data and authentication layers have been migrated from Supabase to a self-hosted PostgreSQL and Express stack.

## Current features

- Email and password registration and login
- Server-managed login sessions stored in an HTTP-only cookie
- Authenticated dashboard routes
- Crochet pattern and draft management
- Row-by-row project trackers
- Personal inventory management
- Built-in and custom crochet stitches
- Pattern materials and ownership records
- Server-side rendering with Angular SSR

## Technology

### Frontend

- Angular 22
- Angular Router and route guards
- Angular reactive forms
- RxJS
- Angular Material/CDK
- Lucide icons

### Backend

- Express 5
- Passport with the local strategy
- `express-session`
- Argon2 password hashing
- Express Validator
- Helmet in production

### Database

- PostgreSQL
- Drizzle ORM
- Drizzle Kit migrations

## Architecture

Angular and Express live in the same application. Express serves the versioned REST API and hands non-API requests to the Angular SSR engine.

```text
src/
├── app/
│   ├── core/       # Authentication, guards, and application layout
│   ├── features/   # Dashboard, patterns, trackers, inventory, stitches, users
│   └── shared/     # Reusable components, directives, and API types
├── db/
│   ├── migrations/ # PostgreSQL migrations and migration metadata
│   ├── index.ts    # PostgreSQL pool and Drizzle client
│   └── schema.ts   # Drizzle table definitions
├── utils/
│   ├── auth/       # Passport strategy and session serialization
│   ├── controllers/
│   ├── routers/
│   ├── services/   # Database access and authorization rules
│   └── validators/
└── server.ts       # Express, sessions, API routes, and Angular SSR
```

## Authentication

Authentication uses Passport Local and cookie-backed sessions:

1. The client sends an email and password to the login or registration endpoint.
2. The server verifies the password with Argon2.
3. Passport stores the user's ID in the session.
4. The browser stores only the signed session-ID cookie.
5. On later requests, Passport deserializes the user and assigns it to `req.user`.

The Angular client does not store access tokens or send bearer tokens. Protected Angular routes use an authentication guard, while protected API routers use the `authUser` middleware.

## Local setup

### Requirements

- Node.js compatible with Angular 22
- npm
- PostgreSQL

### Install dependencies

```bash
npm install
```

### Configure the environment

Create a `.env` file in the project root:

```dotenv
DATABASE_URL=postgresql://postgres:password@localhost:5432/crochet_counter
SESSION_SECRET=replace-this-with-a-long-random-secret
ALLOWED_ORIGINS=http://localhost:4200,https://crochet-counter.com
NODE_ENV=development
PORT=4000
```

`DATABASE_URL`, `SESSION_SECRET`, and `ALLOWED_ORIGINS` are required. Separate multiple allowed origins with commas. `PORT` defaults to `4000` when the built server is run directly.

Do not commit the `.env` file or real credentials.

### Apply database migrations

```bash
npx drizzle-kit migrate
```

The migrations include the initial schema and the built-in US crochet stitches.

### Start development

```bash
npm start
```

The default Angular development configuration runs with SSR. The development URL is normally:

```text
http://localhost:4200
```

To request the SSR configuration explicitly:

```bash
npm run start:ssr
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Angular development server |
| `npm run start:ssr` | Start development using the SSR configuration |
| `npm run build` | Create the production browser and server bundles |
| `npm run watch` | Continuously build using the development configuration |
| `npm test` | Run the Vitest suite once |
| `npm run serve:ssr:crochet-counter` | Run an already-built SSR server |

Build before using the production SSR command:

```bash
npm run build
npm run serve:ssr:crochet-counter
```

## API overview

All endpoints are under `/api/v1`.

| Area | Base route | Access |
| --- | --- | --- |
| Authentication | `/api/v1/auth` | Login and registration are public; profile and logout require a session |
| Patterns | `/api/v1/patterns` | Authenticated |
| Trackers | `/api/v1/trackers` | Authenticated |
| Inventory | `/api/v1/inventories` | Authenticated |
| Stitches | `/api/v1/stitches` | Authenticated |
| Materials | `/api/v1/materials` | Authenticated |
| Owners | `/api/v1/owners` | Authenticated |

Resource routers provide GET, POST, PUT, and DELETE operations. Authorization is enforced in the service layer using the authenticated user's ID and database relationships.

## Database model

The main tables are:

- `users` and `user_profile` for credentials and public profile data
- `oauth` for future external identity-provider accounts
- `patterns` for pattern content and rows
- `owners` for user-to-pattern access
- `trackers` for progress through owned patterns
- `inventory` for a user's supplies
- `materials` for supplies attached to patterns
- `stitches` for built-in and user-created stitch definitions
- `url` for external resource metadata

Deleting an ownership record also deletes the matching tracker through its composite foreign key.

## Current development notes

- The default in-memory Express session store is suitable only for local development. Production should use a shared PostgreSQL or Redis session store.
- Cookie-authenticated state-changing endpoints still need explicit CSRF protection before production deployment.
- Production deployment requires HTTPS and secure-cookie/proxy configuration.
- Login and registration should be rate-limited before the application is exposed publicly.
- The test runner configuration currently needs Vitest globals enabled before the generated component suites run correctly.

## License

No license has been specified yet.
