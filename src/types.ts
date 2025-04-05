export type IdRecord = [string];

export type MessageRecord = [string, number, Date, Date, any, any]; // msg_id, read_ct, enqueued_at, vt, message, headers

export type BooleanRecord = [boolean];

export type QueueRecord = [string, Date, boolean, boolean]; // queue_name, created_at, is_partitioned, is_unlogged

export type MetricRecord = [string, string, number, number, string, Date]; // queue_name, queue_length, newest_msg_age_sec, oldest_msg_age_sec, total_messages, scrape_time
