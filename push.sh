# REACT
docker container commit 69697a31adaf react-frontend

docker image tag react-frontend poquepoque/worker-image-repo:react-frontend

docker image push poquepoque/worker-image-repo:react-frontend

# NGINX
docker container commit 4ed3eef63ae0 nginx

docker image tag nginx poquepoque/worker-image-repo:nginx

docker image push poquepoque/worker-image-repo:nginx

# MONGO
docker container commit c8a9f110fed0 mongo

docker image tag mongo poquepoque/worker-image-repo:mongo

docker image push poquepoque/worker-image-repo:mongo

# NEST
docker container commit 17e707c3449c nest

docker image tag nest poquepoque/worker-image-repo:nest

docker image push poquepoque/worker-image-repo:nest

# FASTAPI
docker container commit 17e707c3449c fastapi

docker image tag fastapi poquepoque/worker-image-repo:fastapi

docker image push poquepoque/worker-image-repo:fastapi
