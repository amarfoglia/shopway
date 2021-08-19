FROM node:12-buster-slim
WORKDIR /usr/src/app
COPY ["./", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
