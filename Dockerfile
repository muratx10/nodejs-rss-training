# Base Image
FROM node:14.17-alpine3.13
MAINTAINER Murat AKMAMEDAU <muratx10@gmail.com>
ARG PORT
ENV PORT=${PORT:-4000}
WORKDIR /usr/app

#Install Dependencies
COPY package*.json ./
RUN npm install

# Copy in App
COPY . .

# Run Server
EXPOSE $PORT
RUN apk --update add postgresql-client
CMD [ "npm", "start" ]
