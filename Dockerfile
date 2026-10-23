FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN DATABASE_URL=postgresql://user:password@host.docker.internal:5432/database \
    SESSION_SECRET=build-only-not-used-at-runtime \
    ALLOWED_ORIGINS=http://localhost:4000 \
    npm run build


FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production \
    PORT=4000

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build --chown=node:node /app/dist/crochet-counter ./dist/crochet-counter

USER node

EXPOSE 4000

CMD ["node", "dist/crochet-counter/server/server.mjs"]
