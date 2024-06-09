import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgSchema,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const moonsyncSchema = pgSchema("moonsync");

export const UserTable = moonsyncSchema.table("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }).unique().notNull(),
  ctime: timestamp("ctime").notNull().defaultNow(),
  mtime: timestamp("mtime").notNull().defaultNow(),
});

export const Onboarding = moonsyncSchema.table("onboarding", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => UserTable.id)
    .notNull(),
  onboardingJson: jsonb("onboarding_json").notNull(),
  ctime: timestamp("ctime").notNull().defaultNow(),
});

export const ChatTable = moonsyncSchema.table("chat", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => UserTable.id)
    .notNull(),
  chatJson: jsonb("chat_json").notNull(),
  ctime: timestamp("ctime").notNull().defaultNow(),
});

// relations

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    onboarding: one(Onboarding),
    chats: many(ChatTable),
  };
});
