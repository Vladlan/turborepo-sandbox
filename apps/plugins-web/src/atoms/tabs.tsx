import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { API_URL } from "../constants";
import { PluginDataType, TabType } from "types";

const [tabsData] = atomsWithQuery(() => ({
  queryKey: ["tab/list"],
  queryFn: async () => {
    try {
      const response = await fetch(`${API_URL}/tab/list`);
      return (await response.json()) as TabType[];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
}));

export const tabsDataAtom = atom<TabType[]>(
  (get) => get(tabsData) as TabType[]
);

export const selectedTabAtom = atom<TabType | null>(null);

export const [selectedTabDataAtom] = atomsWithQuery<PluginDataType[]>(
  (get) => ({
    queryKey: ["tab-plugins/", get(selectedTabAtom)],
    queryFn: async ({ queryKey: [, selectedTab] }) => {
      try {
        if (!selectedTab) return [];
        const response = await fetch(
          `${API_URL}/tab-plugins/${(selectedTab as TabType).id}`
        );
        return (await response.json()) as PluginDataType[];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    cacheTime: 0,
  })
);

export const allPluginsDisabledAtom = atom<boolean>(false);
