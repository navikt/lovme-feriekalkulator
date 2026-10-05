FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:d45bcef7f6c725cc04e6a5920e8254fc30a252fb3ed74b833a2054b49c17a250 
WORKDIR /app

COPY .next/standalone /app
COPY .next/static /app/.next/static
COPY public /app/public

EXPOSE 3000

ENV NODE_ENV=production
CMD ["server.js"]
