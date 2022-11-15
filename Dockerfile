FROM node:8

COPY . .

COPY .env .

RUN npm install

CMD npm start
