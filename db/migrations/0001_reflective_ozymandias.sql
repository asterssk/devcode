ALTER TABLE "collection" DROP CONSTRAINT "collection_slug_unique";--> statement-breakpoint
ALTER TABLE "collection_closure" DROP CONSTRAINT "collection_closure_pks";--> statement-breakpoint
ALTER TABLE "collection_closure" ADD CONSTRAINT "collection_closure_ancestor_id_descendant_id_pk" PRIMARY KEY("ancestor_id","descendant_id");--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "collection" ADD CONSTRAINT "collection_parent_id_collection_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."collection"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "collection_slug_created_by_index" ON "collection" USING btree ("slug","created_by");--> statement-breakpoint
ALTER TABLE "collection" ADD CONSTRAINT "collection_created_by_parent_id_name_unique" UNIQUE("created_by","parent_id","name");