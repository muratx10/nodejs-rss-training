MAINTAINER Murat AKMAMEDAU <muratx10@gmail.com>

# Base Image
FROM node:14.17-alpine3.13
ENV PORT=4005
WORKDIR /usr/app

#Install Dependencies
COPY package*.json ./
RUN npm install

# Copy in App
COPY . .

# Run Server
EXPOSE $PORT
CMD [ "npm", "start" ]
