import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { useState } from "react";

export interface BasicTabProps {
  icon?: React.ReactNode;
  text?: string;
  page?: React.ReactNode;
  isSelected?: boolean;
  isModified?: boolean;
  onClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClosed?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onContextMenuClicked?: (event: React.MouseEvent<HTMLDivElement>) => void;
  containerStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
  crossStyle?: ComponentStyleMerging;
}

export const BasicTab: React.FC<BasicTabProps> = ({
  text,
  icon,
  isSelected,
  isModified,
  onClicked,
  onClosed,
  onContextMenuClicked,
  containerStyle,
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
          "w-fit",
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

  const _textStyle = MergeComponentStyle(
    {
      css: classNames([
        "cursor-pointer",
        "text-center",
        "grow",
        "flex justify-center",
        "px-[25px]",
      ]),
    },
    textStyle
  );

  const _crossStyle = MergeComponentStyle(
    {
      css: classNames(
        "text-xl cursor-pointer",
        "absolute right-[5px]",
        "hover:text-[#444] text-[#888]",
        "[&[data-hidden='true']]:invisible"
      ),
    },
    crossStyle
  );

  return (
    <div
      data-selected={isSelected}
      className={_containerStyle.css}
      onContextMenuCapture={onContextMenuClicked}
      onClick={onClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <div className={_textStyle.css} style={_textStyle.style}>
        {text || ""}
        {isModified && <div className="text-[16px] translate-x-[5px]">*</div>}
      </div>
      <button
        data-hidden={!isHoverd && !isSelected}
        className={_crossStyle.css}
        style={_crossStyle.style}
        onClickCapture={(event) => {
          event.preventDefault();
          onClosed?.(event);
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default BasicTab;
