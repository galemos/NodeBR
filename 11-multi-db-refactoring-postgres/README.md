docker ps

## ---- PostgresSQL
docker run \
    --name postgres \
    -e PESTGRES_USER=gablemos \
    -e POSTGRES_PASSWORD=root
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
    
    docker run --name postgres -e POSTGRES_USER=gablemos -e POSTGRES_PASSWORD=root -e POSTGRES_DB=heroes -p 5432:5432 -d postgres
    
docker exec -it postgres /bin/bash

docker run \
    --name adminer \
    -p 8080:8080
    --link postgres:postgres \
    -d \
    adminer
    
    docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer
    
## ---- MongoDB

docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=root \
    -d \
    mongo:4
    
    docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=root -d mongo:4
    
docker run \
    --name mongoclient \
    -p 3000:3000
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient
    
    docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
    
docker exec -it mongodb \
                   mongo --host localhost
                   -u admin
                   -p root
                   --authenticationDatabase admin
                   --eval "db.getSiblingDB('herois')
                       .createUser({
                           user: 'gablemos', 
                           pwd: 'roor', 
                           roles:[{
                               role: 'readWrite',
                               db: 'herois'}]
                           })"

    docker exec -it mongodb mongo --host localhost -u admin -p root --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'gablemos', pwd: 'roor',roles:[{role: 'readWrite',db: 'herois'}]})"
    
   