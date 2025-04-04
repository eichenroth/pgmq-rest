import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { sql } from "./db";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      documentation: { info: { title: "pgmq-rest documentation", version: "1.0.0" } },
    }),
  )
  .get("/", () => "Server is running")

  // --- QUEUE MANAGEMENT ---
  .post(
    "/api/v1/create",
    async ({ body: { queue_name } }) => {
      await sql`SELECT pgmq.create(queue_name => ${queue_name}::text)`;
    },
    { body: t.Object({ queue_name: t.String() }) },
  )
  .listen(8080);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);
