import { Pool, PoolClient } from 'pg';

function getEnv(name: string, defaultValue?: string): string {
  const value = Bun.env[name] ?? defaultValue;
  if (!value) throw new Error(`ENV variable ${name} is not set!`);  
  return value;
}

const pool = new Pool({
  host: getEnv('DB_HOST'),
  port: parseInt(getEnv('DB_PORT', '5432'), 10),
  database: getEnv('DB_NAME', 'postgres'),
  user: getEnv('DB_USER', 'postgres'),
  password: getEnv('DB_PASSWORD', 'postgres'),
  max: 20, // Maximum number of clients in the pool
});

pool.on('connect', () => console.log('Connected to PostgreSQL'));
pool.on('error', (err: Error) => console.error('Unexpected error on idle client', err));

export const getClient = async (): Promise<PoolClient> => await pool.connect();
