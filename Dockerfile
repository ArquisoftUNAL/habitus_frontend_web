# build step
FROM node:16.13.2-alpine as build
# ARG TARGET_GATEWAY=https://habitus-gateway-ik25vlw3ta-rj.a.run.app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
# ENV VITE_TARGET_GATEWAY=$TARGET_GATEWAY
# RUN echo "VITE_TARGET_GATEWAY=$TARGET_GATEWAY" > .env
RUN npm run build

# release step
FROM nginx:1.21.5-alpine as release
COPY --from=build ./app/dist/ /etc/nginx/html/
COPY app.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]