FROM nginx:alpine

# Базовый кофигурационный файл
COPY nginx.conf /etc/nginx/nginx.conf
# Шаблонный файл с настройками http со значениями из env
COPY http.conf.template /etc/nginx/templates/http.conf.template

# COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
