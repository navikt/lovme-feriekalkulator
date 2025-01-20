FROM cgr.dev/chainguard/node:latest

COPY . .

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]
