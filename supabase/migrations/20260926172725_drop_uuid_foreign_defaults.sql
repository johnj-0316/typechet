ALTER TABLE "public"."inventory"
ALTER COLUMN author_id DROP DEFAULT;

ALTER TABLE "public"."patterns"
ALTER COLUMN author_id DROP DEFAULT;

ALTER TABLE "public"."owners"
ALTER COLUMN user_id DROP DEFAULT;

ALTER TABLE "public"."trackers"
ALTER COLUMN user_id DROP DEFAULT;

ALTER TABLE "public"."user_profile"
ALTER COLUMN id DROP DEFAULT;