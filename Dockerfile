FROM node:13-alpine

WORKDIR /

# copy everything except React /src
COPY [^src]* .

RUN npm install

EXPOSE 9000

CMD npm start api

# copy React /src
COPY /src /src

RUN npm install

EXPOSE 3000

CMD npm start react
