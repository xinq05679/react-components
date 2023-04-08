import { BasicListItemProps } from "./BasicListItemProps";
import { BasicListProps } from "./BasicListProps";
import BasicListItem from "./BasicListItem";
import { MergeComponentStyle } from "../../utility/componentUtility";

export function BasicList<T extends BasicListItemProps>(
  props: BasicListProps<T>
): React.ReactElement<BasicListProps<T>> {
  const {
    listItems,
    onClicked,
    onContextMenuClicked,
    ListItem,
    containerStyle,
  } = props;

  const _containerStyle = MergeComponentStyle(
    {
      css: "flex flex-col grow shrink-0 overflow-y-auto h-1",
    },
    containerStyle
  );

  return (
    <ul className={_containerStyle.css} style={_containerStyle.style}>
      {listItems.map((item) => {
        const { id } = item;
        return (
          <li key={id} id={id}>
            {(() => {
              const props = {
                ...item,
                onClicked: () => {
                  onClicked?.(id);
                },
                onContextMenuClicked: (pos: any) => {
                  onContextMenuClicked?.(id, pos);
                },
              };
              if (ListItem) return <ListItem {...props} />;
              return <BasicListItem {...props} />;
            })()}
          </li>
        );
      })}
    </ul>
  );
}

export default BasicList;
