FROM node:14.17-alpine3.13
MAINTAINER Murat AKMAMEDAU <muratx10@gmail.com>
ENV PORT=4005
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT
CMD [ "npm", "start" ]
