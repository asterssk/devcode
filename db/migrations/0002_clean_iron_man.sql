ALTER TABLE "collection" DROP CONSTRAINT "collection_parent_id_collection_id_fk";
--> statement-breakpoint
ALTER TABLE "collection" ADD CONSTRAINT "collection_parent_id_collection_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."collection"("id") ON DELETE cascade ON UPDATE no action;