FROM node:18

COPY . .

EXPOSE 3000

CMD node server.js