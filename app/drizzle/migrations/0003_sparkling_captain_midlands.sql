ALTER TABLE "moonsync"."user" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "moonsync"."user" ALTER COLUMN "phone_number" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "moonsync"."user" ADD COLUMN "clerk_id" varchar(32) NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "clerk_id_idx" ON "moonsync"."user" USING btree ("clerk_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "moonsync"."user" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "moonsync"."user" USING btree ("email");--> statement-breakpoint
ALTER TABLE "moonsync"."user" ADD CONSTRAINT "user_clerk_id_unique" UNIQUE("clerk_id");