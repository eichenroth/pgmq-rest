export type MessageIdRecord = [string];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MessageRecord = [string, number, Date, Date, any, any]; // msg_id, read_ct, enqueued_at, vt, message, headers
