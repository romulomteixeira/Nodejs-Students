FROM node:8

ENV BACKEND_URL=172.17.0.1:8080

COPY . .

COPY .env .

RUN npm install

CMD env ; npm start
