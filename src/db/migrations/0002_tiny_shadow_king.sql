ALTER TABLE "user_profile" ADD COLUMN "display_name" text;--> statement-breakpoint
ALTER TABLE "user_profile" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "display_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "phone";