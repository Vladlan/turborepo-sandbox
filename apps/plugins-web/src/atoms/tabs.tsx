import { atom } from "jotai/vanilla";
import getTabs from "../api/get-tabs";

export const tabsData = atom(async () => {
  return await getTabs()
})

export const allPluginsDisabledAtom = atom<boolean>(false);
