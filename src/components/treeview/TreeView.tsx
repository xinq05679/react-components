import { BasicTreeViewItemProps } from "./BasicTreeViewItemProps";
import { BasicTreeViewProps } from "./BasicTreeViewProps";
import BasicTreeView from "./BasicTreeView";
import { useState, useEffect } from "react";
import _ from "lodash";

export interface TreeViewProps<T extends BasicTreeViewItemProps>
  extends Omit<BasicTreeViewProps<T>, "onClicked"> {
  onClicked?: (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    item: T;
  }) => void;
  delegateHandleClicked?: (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    items: Map<string, T>;
    item: T;
    selectedIds: Set<string>;
  }) => boolean;
}

export function TreeView<T extends BasicTreeViewItemProps>(
  props: TreeViewProps<T>
): React.ReactElement<TreeViewProps<T>> {
  const { roots, onClicked, onContextMenuClicked, delegateHandleClicked } =
    props;

  const [items, setItems] = useState<Map<string, T>>(new Map<string, T>());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set<string>()
  );

  // Initialize items state
  useEffect(() => {
    const tempItems = new Map<string, T>();
    const tempSelectedIds = new Set<string>();

    const addItem = (item: T) => {
      tempItems.set(item.id, item);

      if (item.isSelected) {
        tempSelectedIds.add(item.id);
      }

      if (item.children) {
        item.children.forEach((child) => addItem(child as T));
      }
    };

    roots.forEach((root) => {
      addItem(root);
    });

    setItems(tempItems);
    setSelectedIds(tempSelectedIds);
  }, []);

  const _handleClicked = (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    id: string;
  }) => {
    const { id, event } = params;
    const tempItems = _.cloneDeep(items);
    const tempItem = tempItems.get(id) as T;
    const tempSelectedIds = _.cloneDeep(selectedIds);

    let needClicked = true;

    if (delegateHandleClicked) {
      needClicked = delegateHandleClicked({
        event,
        items: tempItems,
        item: tempItem,
        selectedIds: tempSelectedIds,
      });
    }
    // Default behavior
    else {
      if (event.ctrlKey) {
      } else {
        if (tempItem.children) {
          tempItem.isExpanded = !tempItem.isExpanded;
        } else {
          tempSelectedIds.forEach((tempId) => {
            (tempItems.get(tempId) as T).isSelected = false;
          });

          tempSelectedIds.add(id);
          tempItem.isSelected = true;
        }
      }
    }

    setItems(tempItems);
    setSelectedIds(tempSelectedIds);

    if (needClicked) {
      onClicked?.({ item: tempItem, event });
    }
  };

  return (
    <BasicTreeView
      roots={roots.map((root) => items.get(root.id) as T)}
      onClicked={_handleClicked}
      onContextMenuClicked={(params) => onContextMenuClicked?.(params)}
    />
  );
}

export default TreeView;
