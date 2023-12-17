import { Switcher } from "./switcher";

interface PluginCardProps {
  pluginName: string;
  pluginDescription: string;
  active: boolean;
  disabled?: boolean;
  inactive?: boolean;
  onToggle: () => Promise<any>;
}

export const PluginCard = ({
  pluginName,
  pluginDescription,
  active,
  disabled = false,
  inactive = false,
  onToggle,
}: PluginCardProps) => {
  return (
    <div
      className={`prose max-w-sm border-2 rounded-lg p-6 min-w-[320px] ${
        disabled && "opacity-50"
      }`}
    >
      <div className="flex justify-between">
        <h3 className="m-0 grey-700">{pluginName}</h3>
        <Switcher
          active={active || !inactive}
          disabled={disabled}
          onToggle={onToggle}
          withStatusDescription={true}
        />
      </div>

      <p className="text-gray-400 max-w-[250px] text-sm">{pluginDescription}</p>
    </div>
  );
};
