import { index, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { moonsyncSchema } from "./schema";

export const UserTable = moonsyncSchema.table(
  "user",
  {
    id: serial("id").primaryKey(),
    clerkId: varchar("clerk_id", { length: 32 }).unique().notNull(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    phoneNumber: varchar("phone_number", { length: 15 }).unique().notNull(),
    ctime: timestamp("ctime").notNull().defaultNow(),
    mtime: timestamp("mtime").notNull().defaultNow(),
  },
  (table) => {
    return {
      nameIndex: index("name_idx").on(table.name),
    };
  },
);
