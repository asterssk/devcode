import { MyCollectionsContent } from "../_content";
import { sampleItems } from "@/lib/data/sample";

type Props = { params: Promise<{ id: string }> };

export default async function Page({}: Props) {
  return <MyCollectionsContent collections={[]} items={sampleItems} />;
}
