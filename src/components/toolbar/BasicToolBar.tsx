import BasicToolTip, { BasicToolTipProps } from "../tooltip/BasicToolTip";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

type ToolTipProps = Omit<BasicToolTipProps, "text" | "children">;

type ToolBarItemProps = {
  label: string;
  icon: React.ReactNode;
  tooltip?: string;
  selected?: boolean;
  itemStyle?: ComponentStyleMerging;
  tooltipProps?: ToolTipProps;
  onClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLevel?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onContentMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export interface BasicToolBar {
  items: ToolBarItemProps[];
  containerStyle?: ComponentStyleMerging;
  genericItemStyle?: ComponentStyleMerging;
  genericTooltipProps?: ToolTipProps;
}

export const BasicToolBar: React.FC<BasicToolBar> = ({
  items,
  containerStyle,
  genericItemStyle,
  genericTooltipProps,
}) => {
  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("w-[32px] h-[100%]", "bg-[#0e6db7]", "flex flex-col"),
    },
    containerStyle
  );

  const _genericItemStyle = MergeComponentStyle(
    {
      css: classNames(
        ["flex justify-center", "relative", "w-[32px]"],
        ["[&]:hover:text-[#fff]", "[&]:hover:cursor-pointer"],
        [
          "[&[data-selected]]:before:absolute",
          "[&[data-selected]]:before:left-[0px]",
          "[&[data-selected]]:before:bg-[#fff]",
          "[&[data-selected]]:before:h-[100%]",
          "[&[data-selected]]:before:w-[2px]",
          "[&[data-selected]]:text-[#fff]",
        ]
      ),
    },
    genericItemStyle
  );

  const _genericTooltipStyle = MergeComponentStyle(
    {},
    genericTooltipProps?.tooltipStyle
  );

  return (
    <>
      <div className={_containerStyle.css} style={_containerStyle.style}>
        {items.map((item) => {
          const itemStyle = MergeComponentStyle(
            _genericItemStyle,
            item.itemStyle
          );

          return (
            <BasicToolTip
              key={item.label}
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
        })}
      </div>
    </>
  );
};

export default BasicToolBar;
