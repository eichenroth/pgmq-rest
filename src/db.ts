const getEnv = (name: string, defaultValue?: string): string => {
  const value = Bun.env[name] ?? defaultValue;
  if (!value) throw new Error(`ENV variable ${name} is not set!`);
  return value;
};

export const sql = new Bun.SQL({
  hostname: getEnv("DB_HOST"),
  port: parseInt(getEnv("DB_PORT", "5432"), 10),
  database: getEnv("DB_NAME", "postgres"),
  username: getEnv("DB_USER", "postgres"),
  password: getEnv("DB_PASSWORD", "postgres"),
  max: 20,
});
