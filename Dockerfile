FROM node:13-alpine

WORKDIR /

# copy everything except React /src
COPY [^src]* .

RUN npm install

CMD npm start

# now copy React /src
COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD npm run build
CMD npm run react
