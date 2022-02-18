#Directly copy dist floder from code case

#FROM node:10
#WORKDIR /usr/src/app
#COPY package.json ./
#RUN npm install
#RUN npm install pm2 -g
#COPY ./dist .
#EXPOSE 3000
#CMD ["pm2-runtime","server.js"]



# need to change "rootDir": "./"  in tsconfig file
#FROM node:16 as base
#WORKDIR /usr/app
#COPY package*.json ./
#COPY tsconfig*.json ./
#RUN npm install typescript -g
#RUN yarn install
#COPY . .
#FROM base as prod
#RUN yarn run build


#  understandable mulistep way
FROM node:12.17.0-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run test
RUN npm run build
## this is stage two , where the app actually runs
FROM node:12.17.0-alpine
WORKDIR /usr
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 8000
CMD ["pm2-runtime","server.js"]





