# pgmq-rest

> Because sometimes your messages need a queue, and your queues need a REST API. Queue up for a better way to handle your PostgreSQL message queues!

## Running the PGMQ REST API

To run the pgmq and the pgmq-rest container and make them available at http://localhost:8080:

First start the PGMQ container:

```bash
docker run -d --name pgmq \
  -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=postgres \
  -v $(pwd)/init-pgmq.sql:/docker-entrypoint-initdb.d/init-pgmq.sql \
  tembo.docker.scarf.sh/tembo/pg17-pgmq:latest
```

Then run the pgmq-rest container:

```bash
docker run -d --name pgmq-rest \
  -p 8080:8080 \
  -e DB_HOST=pgmq \
  -e DB_PORT=5432 \
  -e DB_NAME=postgres \
  -e DB_USER=postgres \
  -e DB_PASSWORD=postgres \
  --link pgmq:postgres \
  eichenroth/pgmq-rest:latest
```

Cleanup and remove the containers:

```bash
docker stop pgmq-rest pgmq
docker rm pgmq-rest pgmq
docker volume rm pgmq_data
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | postgres |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | postgres |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | postgres |
| `DB_POOL_SIZE` | Connection pool size | 20 |

## Examples

See the [example](./example) directory for a more detailed deployment scenario with Docker Compose.

## Development Guide

1. Spin up a local postgres instance with pgmq:
    ```bash
    # Cleanup existing container and volumes
    docker stop pgmq 2>/dev/null || true
    docker rm pgmq 2>/dev/null || true
    docker volume rm pgmq_data 2>/dev/null || true

    # Start PGMQ
    docker run -d --name pgmq \
      -p 5432:5432 \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_DB=postgres \
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
