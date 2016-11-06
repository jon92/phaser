FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD ./worker/package.json /usr/src/app/package.json
RUN npm install

RUN npm install --global nodemon

CMD [ "nodemon", "server.js" ]
