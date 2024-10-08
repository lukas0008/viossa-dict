CREATE TABLE IF NOT EXISTS "viossa-dict_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "viossa-dict_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "viossa-dict_definition" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"owner_id" varchar(255) NOT NULL,
	"word" varchar(64) NOT NULL,
	"definition" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "viossa-dict_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "viossa-dict_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "viossa-dict_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "viossa-dict_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "viossa-dict_account" ADD CONSTRAINT "viossa-dict_account_user_id_viossa-dict_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."viossa-dict_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "viossa-dict_definition" ADD CONSTRAINT "viossa-dict_definition_owner_id_viossa-dict_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."viossa-dict_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "viossa-dict_session" ADD CONSTRAINT "viossa-dict_session_user_id_viossa-dict_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."viossa-dict_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "viossa-dict_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "owner_id_idx" ON "viossa-dict_definition" USING btree ("word");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "viossa-dict_session" USING btree ("user_id");