FROM node:12-buster-slim
ENV NODE_ENV=development
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm", "start" ]

EXPOSE 5000
