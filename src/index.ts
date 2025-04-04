import { sql } from "./db";

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
      const result = await sql`SELECT NOW() as now`;
      console.log(result);
      return new Response(JSON.stringify({ time: result[0].now }), {
        headers: { 'Content-Type': 'application/json' }
      });
    },
  },

  // fallback
  fetch: () => new Response("Not Found", { status: 404 }),
});

console.log(`Server running at http://localhost:${server.port}`);
