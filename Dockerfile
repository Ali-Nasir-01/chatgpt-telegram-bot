FROM node:18.14.0-alpine

WORKDIR /usr/app
COPY package*.json .
RUN npm install --frozen-lockfile
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
RUN npm run build

EXPOSE 8080
CMD ["node", "./dist/main.js"]