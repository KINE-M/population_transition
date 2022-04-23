FROM node:16.14-alpine3.14

WORKDIR /app

COPY ./app /app/

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]



