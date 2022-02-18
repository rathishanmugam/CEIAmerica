
FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN pwd
RUN ls
EXPOSE 8000
CMD  ["npm","run","start"]
