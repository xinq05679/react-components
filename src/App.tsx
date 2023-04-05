import BasicTreeViewItem, {
  BasicTreeViewItemProps,
} from "./components/treeview/BasicTreeViewItem";
import BasicTreeView from "./components/treeview/BasicTreeView";
import BasicTemplate from "./template/BasicTemplate";
import BasicHeader from "./components/header/BasicHeader";
import BasicButton from "./components/button/BasicButton";
import { StyleMergingMode } from "./metadata/ComponentStyle";
import { ButtonType } from "./metadata/ButtonType";
import { ProgressBarDialogProvider } from "./dialog/progressbar-dialog/useProgressBarDialog";

type T = BasicTreeViewItemProps;

const App: React.FC = () => {
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

  const treeView = (
    <div className="flex flex-col h-96">
      <BasicTreeView<T> roots={roots} TreeViewItem={BasicTreeViewItem} />
    </div>
  );

  return (
    <ProgressBarDialogProvider>
      <BasicTemplate
        Header={<BasicHeader title="CVE" />}
        TreeView={treeView}
        ContentPage={
          <BasicButton
            type={ButtonType.Dark}
            customizedStyle={{
              css: "bg-[#f00]",
            }}
          >
            Click me
          </BasicButton>
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
    </ProgressBarDialogProvider>
  );
};

export default App;
