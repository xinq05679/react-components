import { useEffect, useState } from "react";
import BasicList from "./BasicList";
import { BasicListItemProps } from "./BasicListItemProps";
import { BasicListProps } from "./BasicListProps";
import _ from "lodash";

export interface ListProps<T extends BasicListItemProps>
  extends Omit<BasicListProps<T>, "onClicked"> {
  multiSelectionMode?: boolean;
  disableUnselected?: boolean;
  onClicked?: (id: string, selected: boolean) => void;
}

export function List<T extends BasicListItemProps>(
  props: ListProps<T>
): React.ReactElement<ListProps<T>> {
  const {
    listItems,
    multiSelectionMode,
    disableUnselected,
    onClicked,
    onContextMenuClicked,
    containerStyle,
    ...other
  } = props;

  const [items, setItems] = useState<{ [key: string]: T }>({});
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newItems: { [key: string]: T } = {};
    const newSelectedIds: Set<string> = new Set();

    listItems.forEach((item) => {
      newItems[item.id] = item;

      if (item.isSelected) {
        newSelectedIds.add(item.id);
      }
    });

    setItems(newItems);
    setSelectedIds(newSelectedIds);
  }, [listItems]);

  const handleClicked = (id: string) => {
    const clickedItem = items[id];
    if (clickedItem.unselectable) return;
    if (clickedItem.isSelected && !multiSelectionMode && disableUnselected) {
      return onClicked?.(id, true);
    }

    const newItems = _.cloneDeep(items);
    const item = newItems[id];
    const newSelectedIds = _.cloneDeep(selectedIds);

    item.isSelected = !item.isSelected;

    if (!item.isSelected) {
      newSelectedIds.delete(id);
    } else {
      if (!multiSelectionMode) {
        newSelectedIds.forEach((selectedId) => {
          newItems[selectedId].isSelected = false;
        });
        newSelectedIds.clear();
      }
      newSelectedIds.add(id);
    }

    setSelectedIds(newSelectedIds);
    setItems(newItems);
    onClicked?.(id, item.isSelected);
  };

  return (
    <BasicList
      listItems={Object.values(items)}
      onClicked={(id) => handleClicked(id)}
      onContextMenuClicked={(id, pos) => onContextMenuClicked?.(id, pos)}
      containerStyle={containerStyle}
      {...other}
    />
  );
}
export default List;
