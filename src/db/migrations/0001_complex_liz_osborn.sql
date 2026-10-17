DROP INDEX "oauth_provider_account_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "oauth_provider_account_unique" ON "oauth" USING btree ("provider","provider_account_id");