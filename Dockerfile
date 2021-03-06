FROM node:8.10-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install --only=prod

EXPOSE 4004

CMD [ "npm", "start" ]