FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["./", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start", "--prod"]
