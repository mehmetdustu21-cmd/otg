import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

let client: Sql | undefined;

export function getDb(): Sql {
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL, NEON_DATABASE_URL or POSTGRES_URL is not configured");
  }

  if (!client) {
    client = postgres(connectionString, {
      ssl: "require",
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false
    });
  }

  return client;
}
