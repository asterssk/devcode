import { TVisibility } from ".";

export type TCollectionSidebar = {
  id: string;
  name: string;
  color?: string;
  visibility: TVisibility;

  collection_count: number;
};
