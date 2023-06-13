import { BasicTreeViewItemProps } from "./BasicTreeViewItem";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicTreeViewItem from "./BasicTreeViewItem";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { Fragment } from "react";
import classNames from "classnames";

export interface BasicTreeViewProps<T extends BasicTreeViewItemProps> {
  roots: T[];
  TreeViewItemFC?: React.FC<T>;
  outerContainerStyle?: ComponentStyleMerging;
  innerContainerStyle?: ComponentStyleMerging;
}

export function BasicTreeView<T extends BasicTreeViewItemProps>(
  props: BasicTreeViewProps<T>
): React.ReactElement<BasicTreeViewProps<T>> {
  const { roots, TreeViewItemFC, outerContainerStyle, innerContainerStyle } =
    props;

  const _outerContainerStyle = MergeComponentStyle(
    {
      css: classNames("h-[100%] w-[100%]", "overflow-auto", "relative"),
    },
    outerContainerStyle
  );

  const _innerContainerStyle = MergeComponentStyle(
    { css: classNames("flex flex-col", " w-[100%]", "absolute") },
    innerContainerStyle
  );

  const renderedTreeViewItems = (item: T, layer: number): React.ReactNode => {
    const ItemFC = TreeViewItemFC || BasicTreeViewItem;
    if (!item) return null;

    return (
      <Fragment key={item.id}>
        <ItemFC {...item} />
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
    <div
      className={_outerContainerStyle.css}
      style={_outerContainerStyle.style}
    >
      <div
        className={_innerContainerStyle.css}
        style={_innerContainerStyle.style}
      >
        {roots.map((item) => renderedTreeViewItems(item, 0))}
      </div>
    </div>
  );
}

export default BasicTreeView;
