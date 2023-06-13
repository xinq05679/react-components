import BasicToolTip, { BasicToolTipProps } from "../tooltip/BasicToolTip";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

type ToolTipProps = Omit<BasicToolTipProps, "text" | "children">;

export interface BasicToolBarItemProps {
  icon: React.ReactNode;
  position?: number;
  tooltip?: string;
  selected?: boolean;
  itemStyle?: ComponentStyleMerging;
  tooltipProps?: ToolTipProps;
  onClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLevel?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContentMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface BasicToolBarProps {
  items: BasicToolBarItemProps[];
  containerStyle?: ComponentStyleMerging;
  genericItemStyle?: ComponentStyleMerging;
  genericTooltipProps?: ToolTipProps;
}

export const BasicToolBar: React.FC<BasicToolBarProps> = ({
  items,
  containerStyle,
  genericItemStyle,
  genericTooltipProps,
}) => {
  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("h-[100%]", "bg-[#0e6db7]", "flex flex-col items-center"),
    },
    containerStyle
  );

  const _genericItemStyle = MergeComponentStyle(
    {
      css: classNames(
        ["flex justify-center items-center", "relative"],
        ["[&]:hover:text-[#fff]", "[&]:hover:cursor-pointer"],
        [
          "[&[data-selected=true]]:before:absolute",
          "[&[data-selected=true]]:before:left-[0px]",
          "[&[data-selected=true]]:before:bg-[#fff]",
          "[&[data-selected=true]]:before:h-[100%]",
          "[&[data-selected=true]]:before:w-[3px]",
        ]
      ),
    },
    genericItemStyle
  );

  const _genericTooltipStyle = MergeComponentStyle(
    {},
    genericTooltipProps?.tooltipStyle
  );

  const getItem = (item: BasicToolBarItemProps, key: string) => {
    const itemStyle = MergeComponentStyle(_genericItemStyle, item.itemStyle);

    return (
      <BasicToolTip
        key={key}
        {...genericTooltipProps}
        {...item.tooltipProps}
        text={item.tooltip}
        tooltipStyle={MergeComponentStyle(
          _genericTooltipStyle,
          item.tooltipProps?.tooltipStyle
        )}
      >
        <div
          data-selected={item.selected}
          className={itemStyle.css}
          style={itemStyle.style}
          onClick={item.onClicked}
          onMouseEnter={item.onMouseEnter}
          onMouseLeave={item.onMouseLevel}
          onContextMenuCapture={item.onContentMenu}
        >
          {item.icon}
        </div>
      </BasicToolTip>
    );
  };

  return (
    <>
      <div className={_containerStyle.css} style={_containerStyle.style}>
        {
          // Start Items
          items
            .filter((item) => !item.position || item.position >= 0)
            .sort((a, b) => {
              if (!a.position && a.position !== 0) return 1;
              if (!b.position && b.position !== 0) return 1;
              const comparison = a.position - b.position;
              return comparison ? comparison : 1;
            })
            .map((item, index) => getItem(item, index.toString()))
        }
        {<div className="grow"></div>}
        {
          // End Items
          items
            .filter((item) => item.position && item.position < 0)
            .sort((a, b) => {
              const comparison =
                (a.position as number) - (b.position as number);
              return comparison ? comparison : -1;
            })
            .map((item, index) => getItem(item, index.toString()))
        }
      </div>
    </>
  );
};

export default BasicToolBar;
