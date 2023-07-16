import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { API_URL } from "../constants";

export type TabType = {
  id: string;
  icon: string;
  title: string;
};

export type PluginDataType = {
  id: string;
  order: number;
  title: string;
  description: string;
  active: boolean;
  disabled: boolean;
  inactive: boolean;
};

const [tabsData] = atomsWithQuery((get) => ({
  queryKey: ["tab/list"],
  queryFn: async () => {
    const response = await fetch(`${API_URL}/tab/list`);
    return response.json();
  },
}));

export const tabsDataAtom = atom<TabType[]>((get) => get(tabsData));

export const selectedTabAtom = atom<TabType | null>(null);

export const [selectedTabDataAtom] = atomsWithQuery<PluginDataType[]>((get) => ({
  queryKey: ["tab-plugins/", get(selectedTabAtom)],
  queryFn: async ({ queryKey: [, selectedTab] }) => {
    if (!selectedTab) return [];
    const response = await fetch(`${API_URL}/tab-plugins/${(selectedTab as TabType).id}`);
    const data = await response.json();
    return data;
  },
  cacheTime: 0
}));
