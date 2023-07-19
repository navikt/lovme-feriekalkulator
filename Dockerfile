FROM node:18

COPY . .

EXPOSE 3000

CMD ["./node_modules/next/dist/bin/next", "start"]