import { atom } from "jotai/vanilla";
import { atomsWithQuery } from "jotai-tanstack-query";
import { TabType } from "types";
import getTabs from "../api/get-tabs";

const [tabsData] = atomsWithQuery(() => ({
  queryKey: ["tab/list"],
  queryFn: getTabs,
}));

export const tabsDataAtom = atom<TabType[]>(
  (get) => get(tabsData) as TabType[]
);

export const allPluginsDisabledAtom = atom<boolean>(false);
