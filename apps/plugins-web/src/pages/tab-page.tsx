import { useAtomValue } from "jotai";
import { selectedTabDataAtom, selectedTabAtom } from "../atoms/tabs";
import PluginCard from "./plugin-card";
import { API_URL } from "../constants";

const changePluginStatus = async (tab: string, plugin: string, status: string) => {
  if (!tab || !plugin || !status) return;
  const response = await fetch(`${API_URL}/plugin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tab, plugin, status }),
  });
  return response.json();
}


const TabPage = () => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const selectedTabData = useAtomValue(selectedTabDataAtom);

  return (
    <>
      <h1 className="pb-8">
        {selectedTab?.title} plugins
      </h1>
      <div className="flex flex-wrap justify-start gap-8">
        {selectedTabData.map((plugin) => (
          <PluginCard
            key={plugin.id}
            pluginName={plugin.title}
            pluginDescription={plugin.description}
            active={plugin.active}
            disabled={plugin.disabled}
            inactive={plugin.inactive}
            onToggle={() => {
              changePluginStatus(selectedTab?.id as string, plugin.id, plugin.active ? "inactive" : "active");
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TabPage;
