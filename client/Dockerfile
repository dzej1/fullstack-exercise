FROM node:18-alpine

WORKDIR /client

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . ./

EXPOSE 3334

CMD ["npm", "run", "dev"]