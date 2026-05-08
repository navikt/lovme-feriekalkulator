FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:53d56206123d6ab026cc4feac129ea6524b814fa59351a9249a79e1ffbc6e77f 
WORKDIR /app

COPY .next/standalone /app
COPY .next/static /app/.next/static
COPY public /app/public

EXPOSE 3000

ENV NODE_ENV=production
CMD ["server.js"]
