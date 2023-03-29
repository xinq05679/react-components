import TreeViewItem, {
  DefaultTreeViewItemProps,
} from "./components/treeview/TreeViewItem";
import TreeView from "./components/treeview/TreeView";

type T = DefaultTreeViewItemProps;

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

  return (
    <div className="flex flex-col h-96">
      <TreeView<T> roots={roots} TreeViewItem={TreeViewItem} />
    </div>
  );
};

export default App;
