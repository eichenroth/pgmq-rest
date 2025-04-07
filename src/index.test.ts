import { afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { randomUUID } from "crypto";
import { clearTimeout, setTimeout } from "timers";

import { withClient } from "./db";

const API_URL = "http://localhost:8080/api/v1";

const uniqueName = (): string => `test_queue_${randomUUID().replace(/-/g, "")}`;

const apiRequest = async (endpoint: string, body: any, timeout = 5000): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await Bun.fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`request failed ${endpoint}: ${response.status}\n${await response.text()}`);

    if (response.headers.get("Content-Length") === "0") return;
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

describe("pgmq-rest", () => {
  beforeAll(async () => {
    await withClient(async (client) => {
      await client.query("DROP EXTENSION IF EXISTS pgmq;");
      await client.query("CREATE EXTENSION IF NOT EXISTS pgmq;");
    });
  });

  describe("Queue Management", () => {
    test("Create and drop a queue", async () => {
      const queueName = uniqueName();

      await apiRequest("/create", { queue_name: queueName });

      const queues = await apiRequest("/list_queues", {});

      const foundQueue = queues.find((q: any) => q[0] === queueName);
      expect(foundQueue).toBeDefined();
      expect(foundQueue[0]).toBe(queueName);
      expect(foundQueue[1]).toBe(false); // is_partitioned
      expect(foundQueue[2]).toBe(false); // is_unlogged

      const dropResult = await apiRequest("/drop_queue", { queue_name: queueName });
      expect(dropResult).toBe(true);

      const queuesAfterDrop = await apiRequest("/list_queues", {});
      const queueAfterDrop = queuesAfterDrop.find((q: any) => q[0] === queueName);
      expect(queueAfterDrop).toBeUndefined();
    });

    test("Create unlogged queue", async () => {
      const queueName = uniqueName();

      await apiRequest("/create_unlogged", { queue_name: queueName });

      const queues = await apiRequest("/list_queues", {});
      const foundQueue = queues.find((q: any) => q[0] === queueName);
      expect(foundQueue).toBeDefined();
      expect(foundQueue[2]).toBe(true); // is_unlogged

      await apiRequest("/drop_queue", { queue_name: queueName });
    });
  });

  describe("Sending Messages", () => {
    let queueName: string;

    beforeEach(async () => {
      queueName = uniqueName();
      await apiRequest("/create", { queue_name: queueName });
    });

    afterEach(async () => {
      await apiRequest("/drop_queue", { queue_name: queueName });
    });

    test("Send a message", async () => {
      const testMessage = { test: "data", value: 123 };

      const msgIds = await apiRequest("/send", { queue_name: queueName, msg: testMessage });

      expect(msgIds).toBeInstanceOf(Array);
      expect(msgIds.length).toBe(1);
      expect(typeof msgIds[0]).toBe("number");
    });

    test("Send a message with delay", async () => {
      const testMessage = { test: "delayed" };

      const msgIds = await apiRequest("/send", { queue_name: queueName, msg: testMessage, delay: 1 });

      expect(msgIds).toBeInstanceOf(Array);
      expect(msgIds.length).toBe(1);
    });

    test("Send batch messages", async () => {
      const testMessages = [{ test: "batch1" }, { test: "batch2" }, { test: "batch3" }];

      const msgIds = await apiRequest("/send_batch", { queue_name: queueName, msgs: testMessages });

      expect(msgIds).toBeInstanceOf(Array);
      expect(msgIds.length).toBe(3);
    });
  });

  describe("Reading Messages", () => {
    let queueName: string;

    beforeEach(async () => {
      queueName = uniqueName();
      await apiRequest("/create", { queue_name: queueName });
    });

    afterEach(async () => {
      await apiRequest("/drop_queue", { queue_name: queueName });
    });

    test("Read messages", async () => {
      const testMessage = { test: "read_test" };

      const msgIds = await apiRequest("/send", { queue_name: queueName, msg: testMessage });

      const messages = await apiRequest("/read", { queue_name: queueName, vt: 30, qty: 5 });

      expect(messages).toBeInstanceOf(Array);
      expect(messages.length).toBe(1);
      expect(messages[0][0]).toBe(msgIds[0]);
      expect(messages[0][4]).toEqual(testMessage);
    });

    test("Pop message", async () => {
      const testMessage = { test: "pop_test" };

      await apiRequest("/send", { queue_name: queueName, msg: testMessage });

      const messages = await apiRequest("/pop", { queue_name: queueName });

      expect(messages).toBeInstanceOf(Array);
      expect(messages.length).toBe(1);
      expect(messages[0][4]).toEqual(testMessage);
    });
  });

  describe("Deleting and Archiving Messages", () => {
    let queueName: string;

    beforeEach(async () => {
      queueName = uniqueName();
      await apiRequest("/create", { queue_name: queueName });
    });

    afterEach(async () => {
      await apiRequest("/drop_queue", { queue_name: queueName });
    });

    test("Delete a message", async () => {
      const testMessage = { test: "delete_test" };

      const msgIds = await apiRequest("/send", { queue_name: queueName, msg: testMessage });

      const deleteResult = await apiRequest("/delete", { queue_name: queueName, msg_id: msgIds[0] });

      expect(deleteResult).toBe(true);

      const messages = await apiRequest("/read", { queue_name: queueName, vt: 30, qty: 5 });

      expect(messages.length).toBe(0);
    });

    test("Delete batch messages", async () => {
      const testMessages = [{ test: "batch_delete1" }, { test: "batch_delete2" }, { test: "batch_delete3" }];

      const msgIds = await apiRequest("/send_batch", { queue_name: queueName, msgs: testMessages });

      const deletedIds = await apiRequest("/delete_batch", { queue_name: queueName, msg_ids: msgIds });

      expect(deletedIds).toBeInstanceOf(Array);
      expect(deletedIds.length).toBe(3);

      const messages = await apiRequest("/read", { queue_name: queueName, vt: 30, qty: 5 });

      expect(messages.length).toBe(0);
    });

    test("Purge queue", async () => {
      const testMessages = [{ test: "purge1" }, { test: "purge2" }, { test: "purge3" }];

      await apiRequest("/send_batch", { queue_name: queueName, msgs: testMessages });

      const purgeCount = await apiRequest("/purge_queue", { queue_name: queueName });

      expect(purgeCount).toBe(3);

      const messages = await apiRequest("/read", { queue_name: queueName, vt: 30, qty: 5 });

      expect(messages.length).toBe(0);
    });

    test("Archive a message", async () => {
      const testMessage = { test: "archive_test" };

      const msgIds = await apiRequest("/send", { queue_name: queueName, msg: testMessage });

      const archiveResult = await apiRequest("/archive", { queue_name: queueName, msg_id: msgIds[0] });

      expect(archiveResult).toBe(true);

      const messages = await apiRequest("/read", { queue_name: queueName, vt: 30, qty: 5 });

      expect(messages.length).toBe(0);
    });

    test("Archive batch messages", async () => {
      const testMessages = [{ test: "batch_archive1" }, { test: "batch_archive2" }, { test: "batch_archive3" }];

      const msgIds = await apiRequest("/send_batch", { queue_name: queueName, msgs: testMessages });

      const archivedIds = await apiRequest("/archive_batch", { queue_name: queueName, msg_ids: msgIds });

      expect(archivedIds).toBeInstanceOf(Array);
      expect(archivedIds.length).toBe(3);

      const messages = await apiRequest("/read", { queue_name: queueName, vt: 30, qty: 5 });

      expect(messages.length).toBe(0);
    });
  });

  describe("Utilities", () => {
    let queueName: string;

    beforeEach(async () => {
      queueName = uniqueName();
      await apiRequest("/create", { queue_name: queueName });
    });

    afterEach(async () => {
      await apiRequest("/drop_queue", { queue_name: queueName });
    });

    test("Set visibility timeout", async () => {
      const testMessage = { test: "vt_test" };

      const msgIds = await apiRequest("/send", { queue_name: queueName, msg: testMessage });

      const initialMessages = await apiRequest("/read", { queue_name: queueName, vt: 30, qty: 1 });

      const initialVt = initialMessages[0][3]; // vt

      const vtResult = await apiRequest("/set_vt", { queue_name: queueName, msg_id: msgIds[0], vt_offset: 60 });

      expect(vtResult).toBeInstanceOf(Array);
      expect(vtResult.length).toBe(1);

      const newVt = vtResult[0][3];
      expect(newVt).not.toEqual(initialVt);
    });

    test("Get metrics for a queue", async () => {
      await apiRequest("/send_batch", { queue_name: queueName, msgs: [{ test: 1 }, { test: 2 }, { test: 3 }] });

      const metrics = await apiRequest("/metrics", { queue_name: queueName });

      expect(metrics).toBeInstanceOf(Array);
      expect(metrics.length).toBe(1);
      expect(metrics[0][0]).toBe(queueName); // queue_name
      expect(metrics[0][1]).toBe(3); // queue_length
      expect(metrics[0][4]).toBe(3); // total_messages
    });

    test("Get metrics for all queues", async () => {
      await apiRequest("/send", { queue_name: queueName, msg: { test: "metrics_all" } });

      const allMetrics = await apiRequest("/metrics_all", {});

      expect(allMetrics).toBeInstanceOf(Array);

      const queueMetrics = allMetrics.find((m: any) => m[0] === queueName);
      expect(queueMetrics).toBeDefined();
      expect(queueMetrics[1]).toBe(1); // queue_length
    });
  });
});
