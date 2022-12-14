FROM node:latest

WORKDIR /app/crowlo

COPY ./ .

RUN npm install

RUN npm run build

RUN npm run prod

EXPOSE 3000