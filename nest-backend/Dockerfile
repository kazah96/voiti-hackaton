FROM node:alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . /app
RUN yarn build
CMD ["yarn", "start:dev"]

FROM node:alpine as prod
WORKDIR /app
# Копирует содержимое всей папки
COPY --from=build /app .
CMD ["yarn", "start:prod"]
