import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

let client: Sql | undefined;

export function getDb(): Sql {
<<<<<<< HEAD
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL, NEON_DATABASE_URL or POSTGRES_URL is not configured");
=======
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
>>>>>>> 5d41412b7acb25eeba97bd13f612a04efac85728
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
