import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { sql } from "./db";

const app = new Elysia()
  .use(swagger({
    path: "/docs",
    documentation: {
      info: { title: "pgmq-rest documentation",version: "1.0.0",
      },
    },
  }))
  .get("/", () => "Server is running")

  // --- QUEUE MANAGEMENT ---
  .post("/api/v1/create", async ({ body }) => {
    const { queue_name } = body as { queue_name: string };
    await sql`SELECT pgmq.create(queue_name => ${queue_name}::text)`;
    return {};
  })
  .listen(8080);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);
