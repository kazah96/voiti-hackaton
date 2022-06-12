FROM node
WORKDIR /project
COPY package.json .
# COPY yarn.lock .

RUN yarn
# Копирует содержимое всей папки
COPY . .

# EXPOSE 4001