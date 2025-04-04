import { getClient } from "./db";

const server = Bun.serve({
  port: 8080,
  websocket: {
    message() {}, // Required but can be empty
    open() {},
    close() {},
  },
  routes: {
    '/': () => new Response("Server is running"),

    '/api/v1/test': async () => {
      const client = await getClient();
      try {
        const result = await client.query('SELECT NOW()');
        return new Response(JSON.stringify({ time: result.rows[0].now }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } finally {
        client.release();
      }
    },
  },

  // Fallback
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
