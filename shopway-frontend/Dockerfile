FROM node:alpine

ENV WORKINGDIR=/root/app

WORKDIR ${WORKINGDIR}

RUN	mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}

COPY . ${WORKINGDIR}/

RUN	npm install && npm run build

FROM flashspys/nginx-static

RUN apk update && apk upgrade

COPY --from=0 /root/app/build /static
