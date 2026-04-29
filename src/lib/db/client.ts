/**
 * Postgres.js client singleton for Railway Postgres.
 *
 * Cached on `globalThis` so Next.js hot-module reload in dev does not open
 * fresh connection pools on every reload. `prepare: false` is required for
 * compatibility with Railway's pgbouncer (transaction-mode) pooler — leave it.
 */

import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Missing required environment variable: DATABASE_URL. " +
      "Set DATABASE_URL to your Railway Postgres connection string before starting the app.",
  );
}

const globalForSql = globalThis as unknown as {
  sql?: ReturnType<typeof postgres>;
};

export const sql =
  globalForSql.sql ?? postgres(connectionString, { max: 5, prepare: false });

if (process.env.NODE_ENV !== "production") globalForSql.sql = sql;
