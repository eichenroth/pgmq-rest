import { Pool, PoolClient } from "pg";

const getEnv = (name: string): string => {
  const value = Bun.env[name];
  if (!value) throw new Error(`ENV variable ${name} is not set!`);
  return value;
};

const db = new Pool({
  host: getEnv("DB_HOST"),
  port: parseInt(getEnv("DB_PORT"), 10),
  database: getEnv("DB_NAME"),
  user: getEnv("DB_USER"),
  password: getEnv("DB_PASSWORD"),
  max: parseInt(getEnv("DB_POOL_SIZE"), 10),
});

export const withClient = async <T>(fn: (client: PoolClient) => Promise<T>): Promise<T> => {
  const client = await db.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
};
