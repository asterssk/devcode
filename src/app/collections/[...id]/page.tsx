import { sampleItems } from "@/lib/data/sample";
import { MyCollectionsContent } from "../_collections_content";

type Props = { params: Promise<{ id: string }> };

export default async function Page({}: Props) {
  return <MyCollectionsContent collections={[]} items={sampleItems} />;
}
