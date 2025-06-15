FROM node:24-alpine
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}
ENV PORT ${PORT:-5003}

WORKDIR /usr/src/app

RUN apk add --no-cache git

ADD package.json /usr/src/app
RUN npm install --omit=dev

COPY config /usr/src/app/config

COPY build /usr/src/app/build

ADD start.sh /usr/src/app
RUN chmod +x /usr/src/app/start.sh

CMD ["/usr/src/app/start.sh"]

EXPOSE ${PORT}
