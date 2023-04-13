import { useEffect, useState } from "react";
import BasicList from "./BasicList";
import { BasicListItemProps } from "./BasicListItemProps";
import { BasicListProps } from "./BasicListProps";
import _ from "lodash";
import { SelectionMode } from "../../metadata/SelectionMode";

export interface ListProps<T extends BasicListItemProps>
  extends Omit<BasicListProps<T>, "onClicked"> {
  mode?: SelectionMode;
  onClicked?: (id: string, selected: boolean) => void;
}

export function List<T extends BasicListItemProps>(
  props: ListProps<T>
): React.ReactElement<ListProps<T>> {
  const {
    listItems,
    mode,
    onClicked,
    onContextMenuClicked,
    containerStyle,
    ...other
  } = props;

  const [items, setItems] = useState<{ [key: string]: T }>({});

  useEffect(() => {
    const newItems: { [key: string]: T } = {};

    listItems.forEach((item) => {
      newItems[item.id] = item;
    });

    setItems(newItems);
  }, [listItems]);

  const handleClicked = (id: string) => {
    const clickedItem = items[id];

    switch (mode) {
      case SelectionMode.Unselectable:
        return onClicked?.(id, false);

      case SelectionMode.SingleUnselected:
        if (clickedItem.isSelected) return onClicked?.(id, true);
        break;
    }

    if (clickedItem.unselectable) return;

    const newItems = _.cloneDeep(items);
    const item = newItems[id];

    item.isSelected = !item.isSelected;

    if (item.isSelected && mode !== SelectionMode.Multi) {
      Object.values(newItems).forEach((_item) => {
        _item.isSelected = _item.id === id;
      });
    }

    setItems(newItems);
    onClicked?.(id, item.isSelected);
    return;
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
