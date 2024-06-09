import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/drizzle/schema/*.tsx",
  out: "./app/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
