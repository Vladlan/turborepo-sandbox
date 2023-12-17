import { API_URL } from "../constants";
import { PluginDataType } from "types";

const getTabPlugins = async (tabId: string) => {
  if (!tabId) return [];
  const response = await fetch(`${API_URL}/tab-plugins/${tabId}`);
  return (await response.json()) as PluginDataType[];
};

export default getTabPlugins;
