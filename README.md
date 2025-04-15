# pgmq-rest

> Because sometimes your messages need a queue, and your queues need a REST API.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker Pulls](https://img.shields.io/docker/pulls/eichenroth/pgmq-rest)](https://hub.docker.com/r/eichenroth/pgmq-rest)
[![Tests](https://github.com/eichenroth/pgmq-rest/actions/workflows/test.yml/badge.svg)](https://github.com/eichenroth/pgmq-rest/actions/workflows/test.yml)

## Overview

pgmq-rest provides a REST API for [PGMQ](https://github.com/tembo-io/pgmq) (PostgreSQL Message Queue), making it easy to integrate message queues into your applications.

## Features

- 🚀 Simple REST API for [PGMQ](https://github.com/tembo-io/pgmq) (PostgreSQL Message Queue)
- 🔄 Support for sending and receiving messages
- 📦 Batch operations for better performance
- 📊 Queue metrics and monitoring
- 🐳 Docker and Docker Compose support
- 📝 Swagger documentation included

## Quick Start

The fastest way to get started is using Docker Compose:

```bash
cd example
docker-compose up -d
```

To stop the stack:
```bash
docker-compose down -v
```

## Usage Example

Here's a quick example of how to use the API:

```bash
# Send a single message
curl -X POST http://localhost:8080/api/v1/send \
  -H "Content-Type: application/json" \
  -d '{"queue_name": "my_queue", "msg": {"task": "process_data"}}'
# Response: [123]  # Returns the message ID

# Send multiple messages
curl -X POST http://localhost:8080/api/v1/send_batch \
  -H "Content-Type: application/json" \
  -d '{"queue_name": "my_queue", "msgs": [{"task": "process_data"}, {"task": "process_data"}]}'
# Response: [123, 124]  # Returns message IDs for each message

# Read messages
curl -X POST http://localhost:8080/api/v1/read \
  -H "Content-Type: application/json" \
  -d '{"queue_name": "my_queue", "vt": 30, "qty": 1}'
# Response: [["123", 1, "2024-04-15T12:00:00Z", "2024-04-15T12:00:30Z", {"task": "process_data"}, {}]]
# Format: [msg_id, read_ct, enqueued_at, vt, message, headers]

# Read messages with polling
curl -X POST http://localhost:8080/api/v1/read_with_poll \
  -H "Content-Type: application/json" \
  -d '{"queue_name": "my_queue", "vt": 30, "qty": 1}'
# Response: [["123", 1, "2024-04-15T12:00:00Z", "2024-04-15T12:00:30Z", {"task": "process_data"}, {}]]
# Format: [msg_id, read_ct, enqueued_at, vt, message, headers]
```

## API Reference

The API provides the following main endpoints:

- `POST /api/v1/send` - Send a single message to a queue
- `POST /api/v1/send_batch` - Send multiple messages to a queue
- `POST /api/v1/read` - Read messages from a queue
- `POST /api/v1/read_with_poll` - Read messages with polling
- `GET /api/v1/metrics` - Get queue metrics

For detailed API documentation, visit http://localhost:8080/docs after starting the service.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | postgres |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | postgres |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | postgres |
| `DB_POOL_SIZE` | Connection pool size | 20 |

## Performance Considerations

- **Connection Pooling**: Adjust `DB_POOL_SIZE` based on your application's concurrency needs
- **Batch Operations**: Use `send_batch` for better performance when sending multiple messages
- **Visibility Timeout**: Set appropriate visibility timeout when reading messages to prevent message loss
- **Queue Size**: Monitor queue metrics to prevent queue overflow

## Security

- Always use secure connections (HTTPS) in production
- Change default credentials in production
- Use environment variables or secrets management for sensitive configuration
- Consider network isolation for the PostgreSQL instance
- Regularly update to the latest version for security patches

## Development

1. Start a local PostgreSQL instance with pgmq:
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

2. Run the development server:
    ```bash
    DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=postgres DB_NAME=postgres DB_POOL_SIZE=20 bun dev
    ```

3. Run the tests:
    ```bash
    DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=postgres DB_NAME=postgres DB_POOL_SIZE=20 bun test
    ```

## Manual Setup

If you prefer to run the services manually instead of using Docker Compose:

1. Start the PGMQ container:
    ```bash
    docker run -d --name pgmq \
      -p 5432:5432 \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_DB=postgres \
      -v $(pwd)/init-pgmq.sql:/docker-entrypoint-initdb.d/init-pgmq.sql \
      tembo.docker.scarf.sh/tembo/pg17-pgmq:latest
    ```

2. Run the pgmq-rest container:
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

3. Cleanup:
    ```bash
    docker stop pgmq-rest pgmq
    docker rm pgmq-rest pgmq
    docker volume rm pgmq_data
    ```

## Troubleshooting

Common issues and solutions:

1. **Connection Issues**
   - Verify PostgreSQL is running and accessible
   - Check network connectivity between services
   - Verify credentials and permissions

2. **Queue Operations Fail**
   - Check if the queue exists
   - Verify message format
   - Check PostgreSQL logs for errors

3. **Performance Issues**
   - Monitor queue metrics
   - Check PostgreSQL performance
   - Adjust connection pool size if needed

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Elysia.js](https://elysiajs.com/)
- Powered by [PGMQ](https://github.com/tembo-io/pgmq)
