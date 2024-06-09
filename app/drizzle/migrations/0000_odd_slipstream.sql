CREATE SCHEMA "moonsync";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moonsync"."chat" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"chat_json" jsonb NOT NULL,
	"ctime" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moonsync"."onboarding" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"onboarding_json" jsonb NOT NULL,
	"ctime" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moonsync"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" varchar(32) NOT NULL,
	"name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"ctime" timestamp DEFAULT now() NOT NULL,
	"mtime" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moonsync"."chat" ADD CONSTRAINT "chat_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "moonsync"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "moonsync"."onboarding" ADD CONSTRAINT "onboarding_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "moonsync"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "moonsync"."user" USING btree ("name");