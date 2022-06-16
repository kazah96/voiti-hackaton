# Loading .env file
set -o allexport
source .env set
set +o allexport

# Credentials need to be extracted to .env
docker-compose cp mongo-db/fixtures.js mongo:/fixtures.js
docker-compose exec mongo sh -c "mongosh 'mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@mongo:27017' fixtures.js"