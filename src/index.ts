import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";

import { withClient } from "./db";
import { BooleanRecord, IdRecord, MessageRecord, MetricRecord, QueueRecord } from "./types";

const MessageRecordSchema = t.Tuple([t.Number(), t.Number(), t.Date(), t.Date(), t.Any(), t.Any()]);
const QueueRecordSchema = t.Tuple([t.String(), t.Boolean(), t.Boolean(), t.Date()]);
const MetricRecordSchema = t.Tuple([t.String(), t.Number(), t.Nullable(t.Number()), t.Nullable(t.Number()), t.Number(), t.Date()]);

const app = new Elysia()
  .use(swagger({ path: "/docs", documentation: { info: { title: "pgmq-rest documentation", version: "1.0.0" } } }))
  .get("/", ({ redirect }) => redirect("/docs"))

  // --- SENDING MESSAGES ---

  // pgmq.send (queue_name text, msg jsonb, delay integer DEFAULT 0)
  // RETURNS SETOF bigint

  .post(
    "/api/v1/send",
    async ({ body: { queue_name, msg, delay = 0 } }) => {
      return await withClient(async (client) => {
        const result = await client.query<IdRecord>(
          {
            rowMode: "array",
            text: "SELECT pgmq.send($1::text, $2::jsonb, $3::integer)",
            name: "send",
          },
          [queue_name, msg, delay],
        );
        return result.rows.map(([id]) => Number(id));
      });
    },
    {
      body: t.Object({ queue_name: t.String(), msg: t.Any(), delay: t.Optional(t.Integer()) }),
      response: t.Array(t.Number()),
      tags: ["Sending Messages"],
    },
  )

  // pgmq.send_batch (queue_name text, msgs jsonb[], delay integer DEFAULT 0)
  // RETURNS SETOF bigint

  .post(
    "/api/v1/send_batch",
    async ({ body: { queue_name, msgs, delay = 0 } }) => {
      return await withClient(async (client) => {
        const result = await client.query<IdRecord>(
          { rowMode: "array", text: "SELECT pgmq.send_batch($1::text, $2::jsonb[], $3::integer)", name: "send_batch" },
          [queue_name, msgs, delay],
        );
        return result.rows.map(([id]) => Number(id));
      });
    },
    {
      body: t.Object({ queue_name: t.String(), msgs: t.Array(t.Any()), delay: t.Optional(t.Integer()) }),
      response: t.Array(t.Number()),
      tags: ["Sending Messages"],
    },
  )

  // --- READING MESSAGES ---

  // pgmq.read (queue_name text, vt integer, qty integer, conditional jsonb DEFAULT '{}')
  // RETURNS SETOF pgmq.message_record

  .post(
    "/api/v1/read",
    async ({ body: { queue_name, vt, qty, conditional = {} } }) => {
      return await withClient(async (client) => {
        const result = await client.query<MessageRecord>(
          { rowMode: "array", text: "SELECT * FROM pgmq.read($1::text, $2::integer, $3::integer, $4::jsonb)", name: "read" },
          [queue_name, vt, qty, conditional],
        );
        return result.rows.map((row) => [Number(row[0]), row[1], row[2], row[3], row[4], row[5]]);
      });
    },
    {
      body: t.Object({ queue_name: t.String(), vt: t.Integer(), qty: t.Integer(), conditional: t.Optional(t.Any()) }),
      response: t.Array(MessageRecordSchema),
      tags: ["Reading Messages"],
    },
  )

  // pgmq.read_with_poll (queue_name text, vt integer, qty integer, max_poll_seconds integer DEFAULT 5, poll_interval_ms integer DEFAULT 100, conditional jsonb DEFAULT '{}')
  // RETURNS SETOF pgmq.message_record

  .post(
    "/api/v1/read_with_poll",
    async ({ body: { queue_name, vt, qty, max_poll_seconds = 5, poll_interval_ms = 100, conditional = {} } }) => {
      return await withClient(async (client) => {
        const result = await client.query<MessageRecord>(
          {
            rowMode: "array",
            text: "SELECT * FROM pgmq.read_with_poll($1::text, $2::integer, $3::integer, $4::integer, $5::integer, $6::jsonb)",
            name: "read_with_poll",
          },
          [queue_name, vt, qty, max_poll_seconds, poll_interval_ms, conditional],
        );
        return result.rows.map((row) => [Number(row[0]), row[1], row[2], row[3], row[4], row[5]]);
      });
    },
    {
      body: t.Object({
        queue_name: t.String(),
        vt: t.Integer(),
        qty: t.Integer(),
        max_poll_seconds: t.Optional(t.Integer()),
        poll_interval_ms: t.Optional(t.Integer()),
        conditional: t.Optional(t.Any()),
      }),
      response: t.Array(MessageRecordSchema),
      tags: ["Reading Messages"],
    },
  )

  // pgmq.pop (queue_name text)
  // RETURNS SETOF pgmq.message_record

  .post(
    "/api/v1/pop",
    async ({ body: { queue_name } }) => {
      return await withClient(async (client) => {
        const result = await client.query<MessageRecord>({ rowMode: "array", text: "SELECT * FROM pgmq.pop($1::text)", name: "pop" }, [queue_name]);
        return result.rows.map((row) => [Number(row[0]), row[1], row[2], row[3], row[4], row[5]]);
      });
    },
    { body: t.Object({ queue_name: t.String() }), response: t.Array(MessageRecordSchema), tags: ["Reading Messages"] },
  )

  // --- DELETING/ARCHIVING MESSAGES ---

  // pgmq.delete (queue_name text, msg_id: bigint)
  // RETURNS boolean

  .post(
    "/api/v1/delete",
    async ({ body: { queue_name, msg_id } }) => {
      return await withClient(async (client) => {
        const result = await client.query<BooleanRecord>(
          {
            rowMode: "array",
            text: "SELECT pgmq.delete($1::text, $2::bigint)",
            name: "delete",
          },
          [queue_name, msg_id],
        );
        return result.rows[0]?.[0] ?? false;
      });
    },
    { body: t.Object({ queue_name: t.String(), msg_id: t.Number() }), response: t.Boolean(), tags: ["Deleting Messages"] },
  )

  // pgmq.delete (queue_name text, msg_ids: bigint[])
  // RETURNS SETOF bigint

  .post(
    "/api/v1/delete_batch",
    async ({ body: { queue_name, msg_ids } }) => {
      return await withClient(async (client) => {
        const result = await client.query<IdRecord>(
          {
            rowMode: "array",
            text: "SELECT pgmq.delete($1::text, $2::bigint[])",
            name: "delete_batch",
          },
          [queue_name, msg_ids],
        );
        return result.rows.map(([id]) => Number(id));
      });
    },
    { body: t.Object({ queue_name: t.String(), msg_ids: t.Array(t.Number()) }), response: t.Array(t.Number()), tags: ["Deleting Messages"] },
  )

  // purge_queue (queue_name text)
  // RETURNS bigint

  .post(
    "/api/v1/purge_queue",
    async ({ body: { queue_name } }) => {
      return await withClient(async (client) => {
        const result = await client.query<IdRecord>(
          {
            rowMode: "array",
            text: "SELECT pgmq.purge_queue($1::text)",
            name: "purge_queue",
          },
          [queue_name],
        );
        return result.rows[0]?.[0] ? Number(result.rows[0][0]) : 0;
      });
    },
    { body: t.Object({ queue_name: t.String() }), response: t.Number(), tags: ["Deleting Messages"] },
  )

  // pgmq.archive (queue_name text, msg_id bigint)
  // RETURNS boolean

  .post(
    "/api/v1/archive",
    async ({ body: { queue_name, msg_id } }) => {
      return await withClient(async (client) => {
        const result = await client.query<BooleanRecord>(
          {
            rowMode: "array",
            text: "SELECT pgmq.archive($1::text, $2::bigint)",
            name: "archive",
          },
          [queue_name, msg_id],
        );
        return result.rows[0]?.[0] ?? false;
      });
    },
    { body: t.Object({ queue_name: t.String(), msg_id: t.Number() }), response: t.Boolean(), tags: ["Deleting Messages"] },
  )

  // pgmq.archive (queue_name text, msg_ids bigint[])
  // RETURNS SETOF bigint

  .post(
    "/api/v1/archive_batch",
    async ({ body: { queue_name, msg_ids } }) => {
      return await withClient(async (client) => {
        const result = await client.query<IdRecord>(
          {
            rowMode: "array",
            text: "SELECT pgmq.archive($1::text, $2::bigint[])",
            name: "archive_batch",
          },
          [queue_name, msg_ids],
        );
        return result.rows.map(([id]) => Number(id));
      });
    },
    { body: t.Object({ queue_name: t.String(), msg_ids: t.Array(t.Number()) }), response: t.Array(t.Number()), tags: ["Deleting Messages"] },
  )

  // --- QUEUE MANAGEMENT ---

  // pgmq.create (queue_name text)
  // RETURNS void

  .post(
    "/api/v1/create",
    async ({ body: { queue_name } }) => {
      return await withClient(async (client) => {
        await client.query({ rowMode: "array", text: "SELECT pgmq.create($1::text)", name: "create" }, [queue_name]);
      });
    },
    { body: t.Object({ queue_name: t.String() }), tags: ["Queue Management"] },
  )

  // pgmq.create_partitioned (queue_name text, partition_interval text DEFAULT '10000'::text, retention_interval text DEFAULT '100000'::text)
  // RETURNS void

  // ...
  // delayed for now because it is not supported out of the box by the pgmq docker image

  // pgmq.create_unlogged (queue_name text)
  // RETURNS void

  .post(
    "/api/v1/create_unlogged",
    async ({ body: { queue_name } }) => {
      return await withClient(async (client) => {
        await client.query({ rowMode: "array", text: "SELECT pgmq.create_unlogged($1::text)", name: "create_unlogged" }, [queue_name]);
      });
    },
    { body: t.Object({ queue_name: t.String() }), tags: ["Queue Management"] },
  )

  // pgmq.detach_archive (queue_name text)
  // RETURNS void

  // ...
  // delayed for now because it is a weird feature

  // pgmq.drop_queue (queue_name text)
  // RETURNS boolean

  .post(
    "/api/v1/drop_queue",
    async ({ body: { queue_name } }) => {
      return await withClient(async (client) => {
        const result = await client.query<BooleanRecord>(
          {
            rowMode: "array",
            text: "SELECT pgmq.drop_queue($1::text)",
            name: "drop_queue",
          },
          [queue_name],
        );
        return result.rows[0]?.[0] ?? false;
      });
    },
    { body: t.Object({ queue_name: t.String() }), response: t.Boolean(), tags: ["Queue Management"] },
  )

  // --- UTILITIES ---

  // pgmq.set_vt (queue_name text, msg_id bigint, vt_offset integer)
  // RETURNS pgmq.message_record

  .post(
    "/api/v1/set_vt",
    async ({ body: { queue_name, msg_id, vt_offset } }) => {
      return await withClient(async (client) => {
        const result = await client.query<MessageRecord>(
          { rowMode: "array", text: "SELECT * FROM pgmq.set_vt($1::text, $2::bigint, $3::integer)", name: "set_vt" },
          [queue_name, msg_id, vt_offset],
        );
        return result.rows.map((row) => [Number(row[0]), row[1], row[2], row[3], row[4], row[5]]);
      });
    },
    {
      body: t.Object({ queue_name: t.String(), msg_id: t.Number(), vt_offset: t.Number() }),
      response: t.Array(MessageRecordSchema),
      tags: ["Utilities"],
    },
  )

  // pgmq.list_queues ()
  // RETURNS TABLE(queue_name text, is_partitioned boolean, is_unlogged boolean, created_at timestamp with time zone)

  .post(
    "/api/v1/list_queues",
    async () => {
      return await withClient(async (client) => {
        const result = await client.query<QueueRecord>({ rowMode: "array", text: "SELECT * FROM pgmq.list_queues()", name: "list_queues" });
        return result.rows;
      });
    },
    { response: t.Array(QueueRecordSchema), tags: ["Utilities"] },
  )

  // pgmq.metrics (queue_name: text)
  // RETURNS TABLE(queue_name text, queue_length bigint, newest_msg_age_sec integer, oldest_msg_age_sec integer, total_messages bigint, scrape_time timestamp with time zone)

  .post(
    "/api/v1/metrics",
    async ({ body: { queue_name } }) => {
      return await withClient(async (client) => {
        const result = await client.query<MetricRecord>(
          {
            rowMode: "array",
            text: "SELECT * FROM pgmq.metrics($1::text)",
            name: "metrics",
          },
          [queue_name],
        );
        return result.rows.map((row) => [row[0], Number(row[1]), row[2], row[3], Number(row[4]), row[5]]);
      });
    },
    { body: t.Object({ queue_name: t.String() }), response: t.Array(MetricRecordSchema), tags: ["Utilities"] },
  )

  // pgmq.metrics_all ()
  // RETURNS TABLE(queue_name text, queue_length bigint, newest_msg_age_sec integer, oldest_msg_age_sec integer, total_messages bigint, scrape_time timestamp with time zone)

  .post(
    "/api/v1/metrics_all",
    async (): Promise<[string, number, number | null, number | null, number, Date][]> => {
      return await withClient(async (client) => {
        const result = await client.query<MetricRecord>({ rowMode: "array", text: "SELECT * FROM pgmq.metrics_all()", name: "metrics_all" });
        return result.rows.map((row) => [row[0], Number(row[1]), row[2], row[3], Number(row[4]), row[5]]);
      });
    },
    { response: t.Array(MetricRecordSchema), tags: ["Utilities"] },
  )

  .listen(8080);

console.log(`Server running at http://${app.server?.hostname}:${app.server?.port}`);
