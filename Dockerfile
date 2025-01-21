FROM gcr.io/distroless/nodejs22-debian12

COPY . .

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]
