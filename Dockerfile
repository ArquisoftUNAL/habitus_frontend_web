FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
# copy all files
COPY . .
cmd ["npm", "run", "dev"]