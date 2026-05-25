FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:c23a1cdf2551d35791717828bb73a2cf39f1b9470e92c652bbf738f68e116930 
WORKDIR /app

COPY .next/standalone /app
COPY .next/static /app/.next/static
COPY public /app/public

EXPOSE 3000

ENV NODE_ENV=production
CMD ["server.js"]
