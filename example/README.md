# Docker Compose Example

This example demonstrates how to run pgmq-rest with PostgreSQL and pgmq extension in a docker compose stack.

## Quick Start

Start the stack from this directory:
```bash
docker-compose up -d
```

The services will be available at:
- pgmq-rest API: http://localhost:8080
- PostgreSQL: localhost:5432

## Configuration

The stack includes:
- pgmq-rest service using the official image `eichenroth/pgmq-rest:latest`
- PGMQ image from `tembo.docker.scarf.sh/tembo/pg17-pgmq:latest`
- Persistent volume for PostgreSQL data
- Default credentials:
  - Database user: postgres
  - Database password: postgres
  - Database name: postgres

## Stopping the Stack

To stop the stack:
```bash
docker-compose down -v
```

## Files

- `docker-compose.yml`: Docker Compose configuration
- `init.sql`: SQL script to install pgmq extension
