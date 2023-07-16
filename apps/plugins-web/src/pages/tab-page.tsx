import { useAtomValue } from "jotai";
import { selectedTabDataAtom } from "../atoms/tabs";
import PluginCard from "./plugin-card";

const TabPage = () => {
  const selectedTabData = useAtomValue(selectedTabDataAtom);

  return (
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
  );
};

export default TabPage;
