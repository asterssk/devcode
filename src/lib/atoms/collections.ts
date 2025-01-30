import { atomWithStorage } from "jotai/utils";

export const myCollectionsViewAtom = atomWithStorage<"grid" | "table">(
  "__collectionPrefView",
  "grid"
);
