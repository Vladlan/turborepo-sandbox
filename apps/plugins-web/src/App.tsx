import Logo from "/logo.svg";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { selectedTabAtom, tabsDataAtom } from "./atoms/tabs";
import NavOption from "./pages/nav-option";
import { Outlet } from "react-router-dom";
import Switcher from "./pages/switcher";
import { BiSolidGrid } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegCalendarCheck } from "react-icons/fa";

const IconsMap = {
  "icon-marketing": <BiSolidGrid />,
  "icon-finance": <RiMoneyDollarCircleLine />,
  "icon-people": <FaRegCalendarCheck />,
};

function App() {
  const [tabs] = useAtom(tabsDataAtom);
  const selectedTab = useAtomValue(selectedTabAtom);
  const setSelectedTab = useSetAtom(selectedTabAtom);
  if (tabs?.length && !selectedTab) {
    setSelectedTab(tabs[0]);
  }
  const isAllPluginsEnabled = true;

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
              <div className="w-[2rem]">{IconsMap[tab.icon as keyof typeof IconsMap]}</div>
            </NavOption>
          ))}

          <div className="w-full absolute left-0 bottom-0 flex p-4 pb-8 justify-evenly">
            <h5 className="font-light">
              All plugins {isAllPluginsEnabled ? "enabled" : "disabled"}
            </h5>

            <Switcher
              active={isAllPluginsEnabled}
              onToggle={() => {
                console.log("toggle switcer: ");
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
