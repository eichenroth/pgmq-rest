import { sql } from "./db";

const server = Bun.serve({
  port: 8080,
  websocket: {
    message() {}, // Required but can be empty
    open() {},
    close() {},
  },
  routes: {
    '/': () => Response.json({ message: "Server is running" }),

    // --- QUEUE MANAGEMENT ---

    '/api/v1/create': {
      POST: async (request: Request) => {
        const { queue_name } = await request.json();
        await sql`SELECT pgmq.create(queue_name => ${queue_name}::text)`;
        return new Response();
      }},

    // fallback
    "/*": () => Response.json({ message: "Not Found" }, { status: 404 }),
  },
});

console.log(`Server running at http://${server.hostname}:${server.port}`);
