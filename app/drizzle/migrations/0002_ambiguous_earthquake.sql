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
ALTER TABLE "moonsync"."users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "moonsync"."user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "moonsync"."user" DROP CONSTRAINT "users_phone_number_unique";--> statement-breakpoint
ALTER TABLE "moonsync"."user" ALTER COLUMN "ctime" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "moonsync"."user" ALTER COLUMN "mtime" SET DEFAULT now();--> statement-breakpoint
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
ALTER TABLE "moonsync"."user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "moonsync"."user" ADD CONSTRAINT "user_phone_number_unique" UNIQUE("phone_number");