import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import session from "express-session";
import passport from "passport";
import helmet from "helmet";
import { join } from 'node:path';

import { authUser } from './utils/controllers/User/authUser';
import { authRouter } from './utils/routers/auth';
import { patternRouter } from './utils/routers/patterns';
import { ownerRouter } from './utils/routers/owners';
import { stitchRouter } from './utils/routers/stitches';
import { inventoryRouter } from './utils/routers/inventories';
import { trackerRouter } from './utils/routers/trackers';
import { materialRouter } from './utils/routers/materials';
import { handleError } from './utils/errors/handleError';

import "./utils/auth/serialization";
import { verifyStrategy } from './utils/auth/strategies/verifyStrategy';
import { validateOrigin } from './security/validateOrigin';
import { DBStore } from './security/sessionStore';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const VERSION = 1;
const isProd = process.env["NODE_ENV"] === "production";
const sessionSecret = process.env["SESSION_SECRET"];
const api = (endpoint: string) => `/api/v${VERSION}/${endpoint}`;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not configured.");
}

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

isProd && app.use(helmet());

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use(express.json());

isProd && app.use("/api", validateOrigin);

app.use(
  session({
    store: DBStore,
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(verifyStrategy);

app.use(api("auth"), authRouter);

app.use(api("patterns"), authUser, patternRouter);

app.use(api("owners"), authUser, ownerRouter);

app.use(api("stitches"), authUser, stitchRouter);

app.use(api("inventories"), authUser, inventoryRouter);

app.use(api("trackers"), authUser, trackerRouter);

app.use(api("materials"), authUser, materialRouter);

app.use(handleError);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
