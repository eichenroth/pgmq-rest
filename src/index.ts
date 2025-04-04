const server = Bun.serve({
  port: 8080,
  fetch(request: Request) {
    return new Response("Hello from Bun!");
  },
});

console.log(`Listening on http://localhost:${server.port}`);
