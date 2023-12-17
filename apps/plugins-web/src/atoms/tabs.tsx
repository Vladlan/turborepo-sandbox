import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { API_URL } from "../constants";
import { TabType } from "types";

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

export const allPluginsDisabledAtom = atom<boolean>(false);
