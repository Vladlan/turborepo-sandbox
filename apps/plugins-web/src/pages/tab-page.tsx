import { useAtomValue } from "jotai/react";
import { allPluginsDisabledAtom } from "../atoms/tabs";
import { selectedTabAtom, selectedTabDataAtom } from "../atoms/selected-tab";
import { PluginCard } from "ui";
import changePluginStatus from "../api/change-plugin-status";

const TabPage = () => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const selectedTabData = useAtomValue(selectedTabDataAtom);
  const isAllPluginsDisabled = useAtomValue(allPluginsDisabledAtom);

  return (
    <>
      <h1 className="pb-8">{selectedTab?.title} plugins</h1>
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
              return changePluginStatus(
                selectedTab?.id as string,
                plugin.id,
                plugin.active ? "inactive" : "active"
              );
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TabPage;
