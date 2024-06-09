import { relations } from "drizzle-orm";
import { Onboarding } from "./onboarding";
import { ChatTable } from "./chat";
import { UserTable } from "./user";

// relations

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    onboarding: one(Onboarding),
    chats: many(ChatTable),
  };
});
