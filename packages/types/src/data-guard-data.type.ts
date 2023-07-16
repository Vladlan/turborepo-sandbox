
export type PluginType = {
  title: string;
  description: string;
}
export type TabType = {
  title: string;
  icon: string;
  active: string[];
  disabled: string[];
  inactive: string[];
}

export type DataGuardDataType = {
  tabs: string[];
  tabdata: {
    [tabName: string]: TabType;
  };
  plugins: {
    [pluginName: string]: PluginType;
  };
};
