import Logo from "/logo.svg";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { allPluginsDisabledAtom, tabsDataAtom } from "./atoms/tabs";
import { selectedTabAtom } from "./atoms/selected-tab";
import { NavOption, Switcher } from "ui";
import { Outlet } from "react-router-dom";
import { BiSolidGrid } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const IconsMap = {
  "icon-marketing": <BiSolidGrid />,
  "icon-finance": <RiMoneyDollarCircleLine />,
  "icon-people": <FaRegCalendarCheck />,
};

function App() {
  const navigate = useNavigate();
  const [tabs] = useAtom(tabsDataAtom);
  const selectedTab = useAtomValue(selectedTabAtom);
  const setSelectedTab = useSetAtom(selectedTabAtom);
  const [isAllPluginsDisabled, setIsAllPluginsDisabled] = useAtom(
    allPluginsDisabledAtom
  );

  useEffect(() => {
    if (tabs?.length && !selectedTab) {
      const tabId = window.location.pathname.split("/")[2];
      const tab = tabs.find((tab) => tab.id === tabId) || tabs[0];
      setSelectedTab(tab);
      navigate(`tab/${tab.id}`);
    }
  }, []);

  return (
    <div className="grid grid-cols-5 w-screen h-screen">
      <div className="col-span-1">
        <div className="prose h-screen bg-gray-100 flex flex-col relative">
          <div className="p-8 pl-6">
            <h2 className="m-0">
              <img src={Logo} className="logo" alt="DataGuard logo" />
            </h2>
          </div>

          {tabs.map((tab) => (
            <NavOption
              key={tab.id}
              id={tab.id}
              active={selectedTab?.id === tab.id}
              tabName={tab.title}
              onClick={() => setSelectedTab(tab)}
            >
              <div className="w-[2rem]">
                {IconsMap[tab.icon as keyof typeof IconsMap]}
              </div>
            </NavOption>
          ))}

          <div className="w-full absolute left-0 bottom-0 flex p-4 pb-8 justify-evenly">
            <h5 className="font-light">
              All plugins {isAllPluginsDisabled ? "disabled" : "enabled"}
            </h5>

            <Switcher
              active={!isAllPluginsDisabled}
              onToggle={() => {
                setIsAllPluginsDisabled(!isAllPluginsDisabled);
                return Promise.resolve();
              }}
              withIcon={true}
            />
          </div>
        </div>
      </div>
      <div className="col-span-4 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
