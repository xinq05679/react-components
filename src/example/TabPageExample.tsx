import BasicTabPage from "../components/tabpage/BasicTabPage";
import { BasicTabProps } from "../components/tabpage/BasicTabProps";
import { useEffect, useState } from "react";
import _ from "lodash";

export const TabPageExample: React.FC = () => {
  const [tabs, setTabs] = useState<BasicTabProps[]>([
    {
      id: "tab-1",
      text: "tab-1",
      page: <div className="h-[100%] w-[100%] bg-[#f00]"></div>,
    },
    {
      id: "tab-2",
      text: "tab-2",
      isSelected: true,
      page: <div className="h-[100%] w-[100%] bg-[#0f0]"></div>,
    },
    {
      id: "tab-3",
      text: "tab-3",
      page: <div className="h-[100%] w-[100%] bg-[#00f]"></div>,
    },
  ]);

  const handleClicked = (id: string) => {
    const tempTabs = _.cloneDeep(tabs);

    tempTabs.forEach((tab) => (tab.isSelected = tab.id === id));
    console.log(tempTabs);
    setTabs(tempTabs);
  };

  const handleClose = (id: string) => {
    const tempTabs = _.cloneDeep(tabs);

    setTabs(tempTabs.filter((tab) => tab.id !== id));
  };

  return (
    <BasicTabPage
      tabs={tabs}
      onTabClicked={({ id, event }) => handleClicked(id)}
      onTabClosed={({ id, event }) => handleClose(id)}
    />
  );
};

export default TabPageExample;
