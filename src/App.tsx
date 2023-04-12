import BasicTreeViewItem, {
  BasicTreeViewItemProps,
} from "./components/treeview/BasicTreeViewItem";
import BasicTreeView from "./components/treeview/BasicTreeView";
import BasicTemplate from "./template/BasicTemplate";
import BasicHeader from "./components/header/BasicHeader";
import BasicButton from "./components/button/BasicButton";
import { StyleMergingMode } from "./metadata/ComponentStyle";
import { ButtonType } from "./metadata/ButtonType";

import BasicListItem from "./components/list/BasicListItem";
import { BasicListItemProps } from "./components/list/BasicListItemProps";
import List from "./components/list/List";
import BasicSearchTextBox from "./components/search/BasicSearchBar";
import BasicTable from "./components/table/BasicTable";
import BasicLink from "./components/input/BasicLink";
import BasicTextInput from "./components/input/BasicTextInput";
import QueryDialog from "./dialog/query-dialog/QueryDialog";

import BasicTab from "./components/tabpage/BasicTab";
import BasicTabPage from "./components/tabpage/BasicTabPage";
import { SelectionMode } from "./metadata/SelectionMode";
import { BasicProgressBar } from "./components/progressbar/BasicProgressBar";
import useProgressBarDialog from "./dialog/progressbar-dialog/useProgressBarDialog";
import useQueryDialog from "./dialog/query-dialog/useQueryDialog";
import { useEffect } from "react";
type T = BasicTreeViewItemProps;

const App: React.FC = () => {
  const { openProgressBarDialog, isOpen } = useProgressBarDialog();
  const { openQueryDialog, closeQueryDialog } = useQueryDialog();

  const roots: T[] = [
    {
      id: "root-1",
      name: "root-1",
      children: [
        {
          id: "child-1-1",
          name: "child-1-1",
        },
      ],
    },
    {
      id: "root-2",
      name: "root-2",
      children: [
        {
          id: "child-2-1",
          name: "child-2-1",
        },
      ],
    },
  ];

  const listFC = () => {
    const listItem: React.FC<BasicListItemProps> = (props) => {
      return <BasicListItem {...props} />;
    };

    return (
      <div className="flex flex-col h-96">
        <List
          listItems={[
            {
              id: "list-1",
              text: "list-1",
            },
            { id: "list-2", text: "list-2" },
            { id: "list-3", text: "list-3" },
          ]}
          ListItem={listItem}
          containerStyle={{
            css: "items-center",
          }}
          mode={SelectionMode.Multi}
        />
      </div>
    );
  };

  const treeView = (
    <div className="flex flex-col h-96">
      <BasicTreeView<T> roots={roots} TreeViewItem={BasicTreeViewItem} />
    </div>
  );

  return (
    <BasicTemplate
      Header={<BasicHeader title="CVE" />}
      SideBar={treeView}
      ContentPage={
        // <BasicButton
        //   type={ButtonType.Dark}
        //   customizedStyle={{
        //     css: "bg-[#f00]",
        //   }}
        // >
        //   Click me
        // </BasicButton>
        // ######
        // <BasicListItem id="list-item" text="haha" />
        // #####
        // <div className="flex flex-col h-96">{listFC()}</div>
        // ###
        // <BasicSearchTextBox onSubmit={(val) => console.log(val)} />
        // ###
        // <BasicLabel value="1@1" editable />
        // ###
        // <BasicTable
        //   headerCell={[<div className="min-w-[200px]">abc</div>, 2, 3, 4]}
        //   tableCell={[
        //     [
        //       <BasicLink text="778" />,
        //       <BasicLink text="5" />,
        //       <BasicTextInput text="1@1" editable />,
        //       listFC(),
        //     ],
        //     [
        //       <BasicSearchTextBox
        //         containerStyle={{ css: "w-[80%]" }}
        //         onChanged={(val) => console.log(val)}
        //       />,
        //       <BasicTextInput text="1@1" />,
        //       <BasicTextInput text="1@1" editable />,
        //       7,
        //     ],
        //   ]}
        //   headerStyle={{
        //     css: "p-1 h-[35px] bg-[#fff] text-[color:#f00] border-y-[3px] border-solid border-[#0e6eb8] text-[18px] ",
        //   }}
        //   tableStyle={{ css: "text-2xl" }}
        // />
        // #
        // <BasicTabPage
        //   tabs={[
        //     {
        //       id: "tab-1",
        //       text: "tab-1",
        //       isSelected: true,
        //     },
        //     {
        //       id: "tab-2",
        //       text: "tab-2",
        //     },
        //   ]}
        // />
        // ###
        <BasicProgressBar />
      }
      headerStyle={{
        css: "h-40",
        style: {
          backgroundColor: "red",
        },
        cssMode: StyleMergingMode.replace,
      }}
      toolbarStyle={{
        css: "w-64",
      }}
    />
  );
};

export default App;
