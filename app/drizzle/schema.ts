import { sql } from "drizzle-orm";
import { pgSchema, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const moonsyncSchema = pgSchema("moonsync");

export const UserTable = moonsyncSchema.table("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).unique().notNull(),
  ctime: timestamp("ctime")
    .notNull()
    .default(sql`current_timestamp`),
  mtime: timestamp("mtime")
    .notNull()
    .default(sql`current_timestamp`),
});
