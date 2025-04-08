# pgmq-rest

A REST API for pgmq.

## Development

1. Spin up a local postgres instance with pgmq:
    ```bash
    # Cleanup existing container and volumes
    docker stop pgmq 2>/dev/null || true
    docker rm pgmq 2>/dev/null || true
    docker volume rm pgmq_data 2>/dev/null || true

    # Start PGMQ
    docker run -d \
      --name pgmq \
      -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres \
      -p 5432:5432 \
      -v pgmq_data:/var/lib/postgresql/data \
      -v $(pwd)/init-pgmq.sql:/docker-entrypoint-initdb.d/init-pgmq.sql \
      tembo.docker.scarf.sh/tembo/pg17-pgmq:latest
    ```

2. Run the dev server:
    ```bash
    DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=postgres DB_NAME=postgres DB_POOL_SIZE=20 bun dev
    ```

3. Run the tests:
    ```bash
    DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=postgres DB_NAME=postgres DB_POOL_SIZE=20 bun test
    ```

## Build

1. Build the docker image:
    ```bash
    docker build -t pgmq-rest .
    ```

2. Run the docker container:
    ```bash
    docker run -d -p 8080:8080 --link pgmq:postgres pgmq-rest
    ```
