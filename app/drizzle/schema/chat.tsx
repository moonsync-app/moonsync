import { integer, jsonb, serial, timestamp } from "drizzle-orm/pg-core";
import { moonsyncSchema } from "./schema";
import { UserTable } from "./user";

export const ChatTable = moonsyncSchema.table("chat", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => UserTable.id)
    .notNull(),
  chatJson: jsonb("chat_json").notNull(),
  ctime: timestamp("ctime").notNull().defaultNow(),
});
