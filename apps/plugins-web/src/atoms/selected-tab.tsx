import { atom } from "jotai/vanilla";
import { TabType } from "types";
import getTabPlugins from "../api/get-tab-plugins";

export const selectedTabAtom = atom<TabType | null>(null);

export const selectedTabDataAtom = atom(async (get) => {
  const selectedTab = get(selectedTabAtom);
  if (!selectedTab) return [];
  return getTabPlugins(selectedTab.id);
});
