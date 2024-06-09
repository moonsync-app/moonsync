import { relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgSchema,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const moonsyncSchema = pgSchema("moonsync");

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
