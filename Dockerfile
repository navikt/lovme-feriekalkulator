FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:08165a24ea553e523a5bca1c69820126a068f4d6630a5d5bbbf8f8ffc6e83042 
WORKDIR /app

COPY .next/standalone /app
COPY .next/static /app/.next/static
COPY public /app/public

EXPOSE 3000

ENV NODE_ENV=production
CMD ["server.js"]
