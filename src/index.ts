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

  // pgmq.send_batch(queue_name text, msgs jsonb[], delay integer DEFAULT 0)
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

  // --- READING MESSAGES ---

  // pgmq.read(queue_name text, vt integer, qty integer, conditional jsonb DEFAULT '{}')
  // RETURNS SETOF pgmq.message_record

  // ...

  // pgmq.read_with_poll(queue_name text, vt integer, qty integer, max_poll_seconds integer DEFAULT 5, poll_interval_ms integer DEFAULT 100, conditional jsonb DEFAULT '{}')
  // RETURNS SETOF pgmq.message_record

  // ...

  // pgmq.pop(queue_name text)
  // RETURNS SETOF pgmq.message_record

  // ...

  // --- DELETING/ARCHIVING MESSAGES ---

  // pgmq.delete (queue_name text, msg_id: bigint)
  // RETURNS boolean

  // ...

  // pgmq.delete (queue_name text, msg_ids: bigint[])
  // RETURNS SETOF bigint

  // ...

  // purge_queue(queue_name text)
  // RETURNS bigint

  // ...

  // pgmq.archive(queue_name text, msg_id bigint)
  // RETURNS boolean

  // ...

  // pgmq.archive(queue_name text, msg_ids bigint[])
  // RETURNS SETOF bigint

  // ...

  // --- QUEUE MANAGEMENT ---

  // pgmq.create(queue_name text)
  // RETURNS void

  .post(
    "/api/v1/create",
    async ({ body: { queue_name } }) => {
      const client = await getClient();
      await client.query({ rowMode: "array", text: "SELECT pgmq.create($1::text)", name: "create" }, [queue_name]);
    },
    { body: t.Object({ queue_name: t.String() }) },
  )

  // pgmq.create_partitioned (queue-ue_name text, partition_interval text DEFAULT '10000'::text, retention_interval text DEFAULT '100000'::text)
  // RETURNS void

  // ...

  // pgmq.create_unlogged(queue_name text)
  // RETURNS void

  // ...

  // pgmq.detach_archive(queue_name text)
  // RETURNS void

  // ...

  // pgmq.drop_queue(queue_name text)
  // RETURNS boolean

  // ...

  // --- UTILITIES ---

  // pgmq.set_vt(queue_name text, msg_id bigint, vt_offset integer)
  // RETURNS pgmq.message_record

  // ...

  // pgmq.list_queues()
  // RETURNS TABLE(queue_name text, created_at timestamp with time zone, is_partitioned boolean, is_unlogged boolean)

  // ...

  // pgmq.metrics(queue_name: text)
  // RETURNS TABLE(queue_name text, queue_length bigint, newest_msg_age_sec integer, oldest_msg_age_sec integer, total_messages bigint, scrape_time timestamp with time zone)

  // ...

  // pgmq.metrics_all()
  // RETURNS TABLE(queue_name text, queue_length bigint, newest_msg_age_sec integer, oldest_msg_age_sec integer, total_messages bigint, scrape_time timestamp with time zone)

  // ...

  .listen(8080);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);
