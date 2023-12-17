import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { PluginDataType, TabType } from "types";
import getTabPlugins from "../api/get-tab-plugins";

export const selectedTabAtom = atom<TabType | null>(null);

export const [selectedTabDataAtom] = atomsWithQuery<PluginDataType[]>(
  (get) => ({
    queryKey: ["tab-plugins/", get(selectedTabAtom)],
    queryFn: async ({ queryKey: [, selectedTab] }) => {
      if (!selectedTab) return [];
      return await getTabPlugins((selectedTab as TabType).id);
    },
    cacheTime: 0,
  })
);
