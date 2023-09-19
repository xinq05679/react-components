import classNames from "classnames";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { Fragment } from "react";

export interface ToolBarItemProps {
  node: React.ReactNode;
  position?: number;
}

interface ToolBarProps {
  items: ToolBarItemProps[];
  containerStyle?: ComponentStyleMerging;
  direction?: "vertical" | "horizontal";
}

export const ToolBar: React.FC<ToolBarProps> = ({
  items,
  containerStyle,
  direction = "vertical",
}) => {
  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("h-full w-full", "bg-[#0e6db7]", {
        "flex flex-col items-center": direction === "vertical",
        "flex items-center": direction === "horizontal",
      }),
    },
    containerStyle
  );

  return (
    <div className={_containerStyle.css} style={_containerStyle.style}>
      {
        // left / top Items
        items
          .filter((item) => !item.position || item.position >= 0)
          .sort((a, b) => {
            if (!a.position && a.position !== 0) return 1;
            if (!b.position && b.position !== 0) return 1;
            const comparison = a.position - b.position;
            return comparison ? comparison : 1;
          })
          .map((item, index) => (
            <Fragment key={`lt-${index}`}>{item.node}</Fragment>
          ))
      }
      {<div className="grow"></div>}
      {
        // right / bottom Items
        items
          .filter((item) => item.position && item.position < 0)
          .sort((a, b) => {
            const comparison = (a.position as number) - (b.position as number);
            return comparison ? comparison : -1;
          })
          .map((item, index) => (
            <Fragment key={`rb-${index}`}>{item.node}</Fragment>
          ))
      }
    </div>
  );
};

export default ToolBar;
