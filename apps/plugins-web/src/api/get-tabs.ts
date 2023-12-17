import { API_URL } from "../constants";
import { TabType } from "types";

const getTabs = async () => {
  const response = await fetch(`${API_URL}/tab/list`);
  return (await response.json()) as TabType[];
};

export default getTabs;
