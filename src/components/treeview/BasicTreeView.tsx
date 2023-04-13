import { BasicTreeViewItemProps } from "./BasicTreeViewItemProps";
import { BasicTreeViewProps } from "./BasicTreeViewProps";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicTreeViewItem from "./BasicTreeViewItem";
import { Fragment } from "react";

export function BasicTreeView<T extends BasicTreeViewItemProps>(
  props: BasicTreeViewProps<T>
): React.ReactElement<BasicTreeViewProps<T>> {
  const {
    roots,
    TreeViewItemFC,
    onClicked,
    onContextMenuClicked,
    containerStyle,
  } = props;

  const _containerStyle = MergeComponentStyle(
    { css: "flex flex-col" },
    containerStyle
  );

  const renderedTreeViewItems = (item: T, layer: number): React.ReactNode => {
    const ItemFC = TreeViewItemFC || BasicTreeViewItem;
    if (!item) return null;

    return (
      <Fragment key={item.id}>
        <ItemFC
          {...item}
          onClicked={(params) => onClicked?.(params)}
          onContextMenuClicked={(params) => onContextMenuClicked?.(params)}
        />
        {(() => {
          if (!item.children || !item.isExpanded) return null;
          return (
            <div key={`${item.id}-children`}>
              {item.children.map((child) =>
                renderedTreeViewItems(child as T, layer + 1)
              )}
            </div>
          );
        })()}
      </Fragment>
    );
  };

  return (
    <div className={_containerStyle.css} style={_containerStyle.style}>
      {roots.map((item) => renderedTreeViewItems(item, 0))}
    </div>
  );
}

export default BasicTreeView;
