import { useAtomValue } from "jotai";
import { selectedTabDataAtom, selectedTabAtom, allPluginsDisabledAtom } from "../atoms/tabs";
import { PluginCard } from "ui";
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
  const isAllPluginsDisabled = useAtomValue(allPluginsDisabledAtom);

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
            disabled={plugin.disabled || isAllPluginsDisabled}
            inactive={plugin.inactive}
            onToggle={() => {
              return changePluginStatus(selectedTab?.id as string, plugin.id, plugin.active ? "inactive" : "active");
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TabPage;
