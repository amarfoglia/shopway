FROM node:12-buster-slim

RUN apt-get update && apt-get upgrade -y
RUN apt-get install python3 -y

ENV WORKINGDIR=/root/app

WORKDIR ${WORKINGDIR}

COPY .  ${WORKINGDIR}/
#COPY src ./src
#COPY tsconfig.json .
#COPY package.json .
#COPY package-lock.json .
#COPY config.env .

RUN	npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "run-script", "start:prod"]
