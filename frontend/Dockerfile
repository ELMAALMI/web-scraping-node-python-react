FROM nginx

WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

RUN apt-get install -y nodejs

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

RUN cp -a /app/dist/. /usr/share/nginx/html/

RUN cp /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

