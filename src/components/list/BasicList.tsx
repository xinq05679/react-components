import { BasicListItemProps } from "./BasicListItem";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import BasicListItem from "./BasicListItem";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { Fragment } from "react";
import classNames from "classnames";

export interface BasicListProps<T extends BasicListItemProps> {
  items: T[];
  ListItemFC?: React.FC<T>;
  outerContainerStyle?: ComponentStyleMerging;
  innerContainerStyle?: ComponentStyleMerging;
}

export function BasicList<T extends BasicListItemProps>(
  props: BasicListProps<T>
): React.ReactElement<BasicListProps<T>> {
  const {
    items,
    ListItemFC = BasicListItem,
    outerContainerStyle,
    innerContainerStyle,
  } = props;

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

  return (
    <div
      className={_outerContainerStyle.css}
      style={_outerContainerStyle.style}
    >
      <ul
        className={_innerContainerStyle.css}
        style={_innerContainerStyle.style}
      >
        {items.map((item) => {
          const { id } = item;
          return (
            <Fragment key={id}>
              {(() => {
                const props = {
                  ...item,
                };
                return <ListItemFC {...props} />;
              })()}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default BasicList;
