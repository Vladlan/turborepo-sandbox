import { useAtomValue } from "jotai";
import { selectedTabDataAtom, selectedTabAtom } from "../atoms/tabs";
import PluginCard from "./plugin-card";

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
          />
        ))}
      </div>
    </>
  );
};

export default TabPage;
