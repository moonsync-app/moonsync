import { integer, jsonb, serial, timestamp } from "drizzle-orm/pg-core";
import { moonsyncSchema } from "./schema";
import { UserTable } from "./user";

export const Onboarding = moonsyncSchema.table("onboarding", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => UserTable.id)
    .notNull(),
  onboardingJson: jsonb("onboarding_json").notNull(),
  ctime: timestamp("ctime").notNull().defaultNow(),
});
