import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { getClient } from "./db";

const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      documentation: { info: { title: "pgmq-rest documentation", version: "1.0.0" } },
    }),
  )
  .get("/", () => "Server is running")

  // --- SENDING MESSAGES ---

  // pgmq.send(queue_name text, msg jsonb, delay integer DEFAULT 0)
  // RETURNS SETOF bigint

  .post(
    "/api/v1/send",
    async ({ body: { queue_name, msg, delay = 0 } }) => {
      const client = await getClient();
      const result = await client.query<[string]>(
        { rowMode: "array", text: "SELECT pgmq.send($1::text, $2::jsonb, $3::integer)", name: "send" },
        [queue_name, msg, delay],
      );
      return result.rows.map(([id]) => Number(id));
    },
    {
      body: t.Object({ queue_name: t.String(), msg: t.Any(), delay: t.Optional(t.Integer()) }),
      response: t.Array(t.Number()),
    },
  )

  // pgmq.send_batch(
  //   queue_name text,
  //   msgs jsonb[],
  //   delay integer DEFAULT 0
  // )
  // RETURNS SETOF bigint

  .post(
    "/api/v1/send_batch",
    async ({ body: { queue_name, msgs, delay = 0 } }) => {
      const client = await getClient();
      const result = await client.query<[string]>(
        { rowMode: "array", text: "SELECT pgmq.send_batch($1::text, $2::jsonb[], $3::integer)", name: "send_batch" },
        [queue_name, msgs, delay],
      );
      return result.rows.map(([id]) => Number(id));
    },
    {
      body: t.Object({ queue_name: t.String(), msgs: t.Array(t.Any()), delay: t.Optional(t.Integer()) }),
      response: t.Array(t.Number()),
    },
  )

  // --- QUEUE MANAGEMENT ---

  // pgmq.create(queue_name text)
  // RETURNS VOID
  .post(
    "/api/v1/create",
    async ({ body: { queue_name } }) => {
      const client = await getClient();
      await client.query({ rowMode: "array", text: "SELECT pgmq.create($1::text)", name: "create" }, [queue_name]);
    },
    { body: t.Object({ queue_name: t.String() }) },
  )
  .listen(8080);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);
