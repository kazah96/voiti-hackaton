# Приложение на NEST.js https://nestjs.com/

Может выполнять роль основного бекенда для приложения

## Важно перед запуском
Пробросить в переменные окружения следующее:

_Для подключения к базе данных_
```
MONGO_USER=
MONGO_PASSWORD=
MONGO_PORT=
MONGO_HOST=
PORT=
```
(заготовка с аналогичным содержанием находится в файле .default.env)


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
