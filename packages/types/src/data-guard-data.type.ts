export type DataGuardPluginType = {
  title: string;
  description: string;
};
export type DataGuardTabType = {
  title: string;
  icon: string;
  active: string[];
  disabled: string[];
  inactive: string[];
};

export type DataGuardDataType = {
  tabs: string[];
  tabdata: {
    [tabName: string]: DataGuardTabType;
  };
  plugins: {
    [pluginName: string]: DataGuardPluginType;
  };
};
