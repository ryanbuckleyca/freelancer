# build environment

FROM node:13-alpine

WORKDIR /

COPY . .

RUN npm install --silent

RUN npm run build

# production environment

FROM nginx:1.16.0-alpine

COPY /build /usr/share/nginx/html

EXPOSE 80

CMD ["sudo", "nginx", "-g", "daemon off;"]
