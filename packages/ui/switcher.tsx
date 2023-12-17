import { useState } from "react";
import { FiPower } from "react-icons/fi";

type SwitcherProps = {
  active: boolean;
  onToggle?: () => Promise<any>;
  disabled?: boolean;
  withIcon?: boolean;
  withStatusDescription?: boolean;
};

export const Switcher = ({
  active,
  onToggle,
  disabled = false,
  withIcon = false,
  withStatusDescription = false,
}: SwitcherProps) => {
  const [enabled, setEnabled] = useState(active);
  return (
    <div
      className="flex flex-col cursor-pointer transition-all items-center"
      onClick={() => {
        if (disabled) return;
        setEnabled(!enabled);
        if (!onToggle) return;
        onToggle().catch(() => setEnabled(!enabled));
      }}
    >
      <div
        className={`${
          enabled ? "bg-green-600" : "bg-red-600"
        } rounded-full p-1 w-12`}
      >
        <div
          className={`${
            enabled ? "ml-auto" : "mr-auto"
          } w-5 h-5 bg-white rounded-full flex items-center justify-center`}
        >
          {withIcon && (
            <FiPower
              className={`${
                enabled ? "text-green-600" : "text-red-600"
              }`}
            />
          )}
        </div>
      </div>

      {withStatusDescription && (
        <span
          className={`${
            enabled ? "text-green-600" : "text-red-600"
          } text-sm mt-1`}
        >
          {enabled ? "Allowed" : "Blocked"}
        </span>
      )}
    </div>
  );
};