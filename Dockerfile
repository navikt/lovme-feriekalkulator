FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:3e086e8a9aef814ded0555a3e4002ac14f1f6c9da45f78913f8d52c72d730d6e 
WORKDIR /app

COPY .next/standalone /app
COPY .next/static /app/.next/static
COPY public /app/public

EXPOSE 3000

ENV NODE_ENV=production
CMD ["server.js"]
