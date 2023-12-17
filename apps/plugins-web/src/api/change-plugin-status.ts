import { API_URL } from "../constants";

const changePluginStatus = async (
  tab: string,
  plugin: string,
  status: string
) => {
  if (!tab || !plugin || !status) return;
  try {
    const response = await fetch(`${API_URL}/plugin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tab, plugin, status }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default changePluginStatus;
