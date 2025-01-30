import { MyCollectionsContent } from "./_content";

export default async function Page() {
  return (
    <MyCollectionsContent
      collections={[
        { id: "one", name: "Collection One" },
        { id: "two", name: "Collection Two" },
      ]}
      items={[]}
    />
  );
}
