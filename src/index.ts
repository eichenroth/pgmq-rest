const server = Bun.serve({
  port: 8080,
  fetch() {
    return new Response("Hello from Bun!");
  },
});

console.info(`Listening on http://localhost:${server.port}`);
