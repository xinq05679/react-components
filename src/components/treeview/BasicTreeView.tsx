import React, { useEffect, useState } from "react";
import { TreeViewItemProps } from "./TreeViewItemProps";
import { TreeViewProps } from "./TreeViewProps";
import _ from "lodash";

export interface BasicTreeViewProps<T extends TreeViewItemProps<T>>
  extends TreeViewProps<T> {}

function BasicTreeView<T extends TreeViewItemProps<T>>(
  props: BasicTreeViewProps<T>
): React.ReactElement<BasicTreeViewProps<T>> {
  const { roots, onClicked, onHovered, onContextMenuClicked, TreeViewItem } =
    props;
  const [items, setItems] = useState<Map<string, T>>(new Map());
  const [selectedId, setSelectedId] = useState("");
  const [hoveredId, setHoveredId] = useState("");

  useEffect(() => {
    const newItems = new Map<string, T>();

    roots.forEach((root) => {
      newItems.set(root.id, root);
      root.children?.forEach((child) => newItems.set(child.id, child));
    });

    setItems(newItems);
  }, [roots]);

  const handleClicked = (id: string) => {
    const newItems = _.cloneDeep(items);
    const newItem = newItems.get(id) as T;

    if (newItem.children) {
      newItem.isExpanded = !newItem.isExpanded;
    } else {
      newItem.isSelected = true;
      if (selectedId) {
        (newItems.get(selectedId) as T).isSelected = false;
      }
      setSelectedId(id);
    }

    onClicked?.(id);

    setItems(newItems);
  };

  const handleHovered = (id: string, hovered: boolean) => {
    const newItems = _.cloneDeep(items);
    const newItem = newItems.get(id) as T;

    if (hovered) {
      if (hoveredId) {
        (newItems.get(hoveredId) as T).isHovered = false;
      }
      setHoveredId(id);
    } else {
      setHoveredId("");
    }
    newItem.isHovered = hovered;

    onHovered?.(id);

    setItems(newItems);
  };

  const renderItem = (itemProps: T): React.ReactNode => {
    const item = items.get(itemProps.id);
    if (!item) return null;

    const { id, children, isExpanded } = item;

    return (
      <li key={id} id={id}>
        <TreeViewItem
          {...item}
          onClicked={() => {
            handleClicked(id);
          }}
          onHovered={() => {
            handleHovered(id, true);
          }}
          onUnhovered={() => {
            handleHovered(id, false);
          }}
          onContextMenuClicked={(pos) => {
            onContextMenuClicked?.(id, pos);
          }}
        />
        {children && isExpanded && (
          <ul key={`${id}-children`}>
            {children.map((child) => renderItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="flex flex-col grow shrink-0 overflow-y-auto h-1">
      {roots.map((root) => renderItem(root))}
    </ul>
  );
}

export default BasicTreeView;
