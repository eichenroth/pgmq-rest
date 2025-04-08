FROM oven/bun:1 AS build-stage

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN bun install

# Copy source code
COPY src/ ./src/
COPY tsconfig.json .

# Build the application
RUN bun build src/index.ts --outdir dist --target bun

# Production image
FROM oven/bun:1-slim

WORKDIR /app

# Copy built files from build-stage
COPY --from=build-stage /app/dist/ ./dist/
COPY --from=build-stage /app/package.json .

# Install production dependencies
RUN bun install --production

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables with defaults
ENV DB_HOST=postgres
ENV DB_PORT=5432
ENV DB_NAME=postgres
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_POOL_SIZE=20

# Run the application
CMD ["bun", "dist/index.js"]
