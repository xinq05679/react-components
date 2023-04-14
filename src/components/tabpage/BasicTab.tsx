import { BasicTabProps } from "./BasicTabProps";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { useState } from "react";

export const BasicTab: React.FC<BasicTabProps> = ({
  id,
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
        [
          "flex items-center",
          "mx-[3px] py-[2px]",
          "w-[120px]",
          "relative",
          "cursor-pointer",
          "bg-[#bcc3c9] hover:bg-[#eee]",
          "rounded-t-[5px]",
        ],
        [
          "before:absolute",
          "before:bg-[#bcc3c9] before:hover:bg-[#eee]",
          "before:bottom-[-8px] before:left-[-5px]",
          "before:h-[10px] before:w-[10px]",
          "before:rotate-[-45deg]",
          "before:z-[-1]",
        ],
        [
          "after:absolute",
          "after:bg-[#bcc3c9] after:hover:bg-[#eee]",
          "after:bottom-[-8px] after:right-[-5px]",
          "after:h-[10px] after:w-[10px]",
          "after:rotate-[-45deg]",
          "after:z-[-1]",
        ],
        [
          "data-[selected=true]:bg-[#fff]",
          "data-[selected=true]:hover:bg-[#eee]",
          "data-[selected=true]:border-b-0",
          "data-[selected=true]:before:bg-[#fff]",
          "data-[selected=true]:before:hover:bg-[#eee]",
          "data-[selected=true]:before:border-b-0",
          "data-[selected=true]:after:bg-[#fff]",
          "data-[selected=true]:after:hover:bg-[#eee]",
          "data-[selected=true]:after:border-b-0",
        ]
      ),
    },
    containerStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "w-[24px]",
    },
    iconStyle
  );

  const _textStyle = MergeComponentStyle(
    {
      css: classNames(["cursor-pointer", "w-[100%] text-center"]),
    },
    textStyle
  );

  const _crossStyle = MergeComponentStyle(
    {
      css: classNames(
        "text-xl cursor-pointer absolute right-[5px]",
        "hover:text-[#444] text-[#888]",
        "aria-hidden:hidden"
      ),
    },
    crossStyle
  );

  return (
    <div
      {...{
        "data-selected": isSelected,
      }}
      className={_containerStyle.css}
      onContextMenuCapture={(event) => {
        onContextMenuClicked?.({
          event,
          id,
        });
      }}
      onClick={(event) => onClicked?.({ event, id })}
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
        onClickCapture={(event) => {
          event.preventDefault();
          onClosed?.({ event, id });
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default BasicTab;
