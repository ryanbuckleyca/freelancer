FROM node:13-alpine

WORKDIR /srv/server

COPY . .

RUN npm install
RUN npm install sequelize-cli -g

EXPOSE 9000

CMD npm run dev
