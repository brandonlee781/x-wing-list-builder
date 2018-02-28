FROM node:9.5-alpine

RUN apk add --no-cache bash

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

EXPOSE 3000

# VOLUME [ "/usr/src/app" ]
CMD ["npm", "start"]