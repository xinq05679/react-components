import { BasicTabProps } from "./BasicTabProps";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { useState } from "react";

export const BasicTab: React.FC<BasicTabProps> = ({
  text,
  icon,
  isSelected,
  isModified,
  onClicked,
  onClosed,
  onContextMenuClicked,
  containerStyle,
  iconStyle,
  textStyle,
  crossStyle,
}) => {
  const [isHoverd, setIsHovered] = useState(false);

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames(
        "relative border-[2px] cursor-pointer",
        "flex items-center gap-[5px]",
        "px-[25px] pr-[35px] py-[5px]",
        "bg-[#eee] hover:bg-[#9ff]",
        "aria-selected:bg-[#0ff] aria-selected:hover:bg-[#9ff]"
      ),
    },
    containerStyle
  );

  const _iconStyle = MergeComponentStyle({}, iconStyle);

  const _textStyle = MergeComponentStyle({ css: "cursor-pointer" }, textStyle);

  const _crossStyle = MergeComponentStyle(
    {
      css: classNames(
        "text-2xl cursor-pointer absolute right-[10px]",
        "hover:text-[#444] text-[#888]",
        "aria-hidden:hidden"
      ),
    },
    crossStyle
  );

  return (
    <div
      aria-selected={isSelected}
      className={_containerStyle.css}
      onContextMenuCapture={(evt) => {
        onContextMenuClicked?.({ x: evt.clientX, y: evt.clientY });
      }}
      onClick={() => onClicked?.()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && (
        <img className={_iconStyle.css} style={_iconStyle.style} src={icon} />
      )}
      <div className={_textStyle.css} style={_textStyle.style}>
        {text || ""}
      </div>
      <button
        aria-hidden={!isHoverd && !isSelected}
        className={_crossStyle.css}
        style={_crossStyle.style}
        onClick={() => onClosed?.()}
      >
        &times;
      </button>
    </div>
  );
};

export default BasicTab;
