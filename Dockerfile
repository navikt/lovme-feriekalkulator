FROM node:18

COPY . .

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]