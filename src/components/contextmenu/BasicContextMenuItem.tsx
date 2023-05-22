import classNames from "classnames";
import { AiFillCaretRight } from "react-icons/ai";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { ContextMenuItemType } from "../../metadata/ContextMenuItemType";
import { MergeComponentStyle } from "../../utility/componentUtility";

export interface BasicContextMenuItemProps {
  id: string;
  text?: React.ReactNode;
  icon?: React.ReactNode;
  arrow?: React.ReactNode;
  type: ContextMenuItemType;
  children?: BasicContextMenuItemProps[];
  onClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
  disable?: boolean;
  selected?: boolean;
  containerDivStyle?: ComponentStyleMerging;
  barDivStyle?: ComponentStyleMerging;
  textDivStyle?: ComponentStyleMerging;
  iconDivStyle?: ComponentStyleMerging;
  arrowDivStyle?: ComponentStyleMerging;
}

export const BasicContextMenuItem: React.FC<BasicContextMenuItemProps> = ({
  id,
  text,
  icon,
  arrow,
  type,
  children,
  onClicked,
  disable,
  selected,
  containerDivStyle,
  barDivStyle,
  textDivStyle,
  iconDivStyle,
  arrowDivStyle,
}) => {
  const _containerStyle = MergeComponentStyle(
    {
      css: classNames(
        ["flex items-center", "h-[24px]", "cursor-pointer"],
        [
          "[&[data-selected=true]]:bg-[#e5f3ff]",
          "[&[data-selected=true]]:border-[#99d1ff]",
          "[&[data-selected=true]]:border",
        ]
      ),
    },
    containerDivStyle
  );

  const _barDivStyle = MergeComponentStyle(
    {
      css: classNames(["h-[1px]", "bg-[#888]"]),
    },
    barDivStyle
  );

  const _textDivStyle = MergeComponentStyle(
    {
      css: classNames(
        "text-left text-[12px]",
        "grow",
        "px-[0.5em]",
        "whitespace-nowrap"
      ),
    },
    textDivStyle
  );

  const _iconDivStyle = MergeComponentStyle(
    {
      css: classNames("w-[20px] h-[100%]", "bg-[#ececec]"),
    },
    iconDivStyle
  );

  const _arrowDivStyle = MergeComponentStyle(
    { css: "text-[16px]" },
    arrowDivStyle
  );

  function renderArrow() {
    if (type !== ContextMenuItemType.Branch) return null;

    return (
      <div className={_arrowDivStyle.css} style={_arrowDivStyle.style}>
        {arrow || <AiFillCaretRight />}
      </div>
    );
  }

  return type === ContextMenuItemType.Bar ? (
    // BAR
    <div className={_barDivStyle.css} style={_barDivStyle.style}></div>
  ) : (
    // ITEM
    <div
      data-selected={selected}
      className={_containerStyle.css}
      style={_containerStyle.style}
      onClick={onClicked}
    >
      {/* ICON */}
      <div className={_iconDivStyle.css} style={_iconDivStyle.style}>
        {icon}
      </div>
      {/* TEXT */}
      <div className={_textDivStyle.css} style={_textDivStyle.style}>
        {text}
      </div>
      {/* ARROW */}
      {renderArrow()}
    </div>
  );
};

export default BasicContextMenuItem;
