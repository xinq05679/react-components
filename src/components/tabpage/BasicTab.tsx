import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { useState } from "react";

export interface BasicTabProps {
  icon?: React.ReactNode;
  text?: React.ReactNode;
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
          "group",
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
          "[&[data-selected='true']]:bg-[#0e6eb8]",
          "[&[data-selected='true']]:text-[#fff]",
          "[&[data-selected='true']]:border-[#0e6eb8]",
          "[&[data-selected='true']]:border",
          "[&[data-selected='true']]:border-b-0",
          "[&[data-selected='true']]:border-b-[#fff]",
        ],
        [
          "[&[data-selected='true']]:hover:bg-[#eee]",
          "[&[data-selected='true']]:hover:text-[#444]",
          "[&[data-selected='true']]:hover:border-0",
        ],
        [
          "[&[data-selected='true']]:before:bg-[#0e6eb8]",
          "[&[data-selected='true']]:before:border-[#004a83]",
        ],
        [
          "[&[data-selected='true']]:after:bg-[#0e6eb8]",
          "[&[data-selected='true']]:after:border-[#004a83]",
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
        "text-[#fff] text-[24px]",
        "cursor-pointer",
        "absolute right-[5px]",
        "[&[data-hidden='true']]:invisible",
        ["group-[&:hover]:hover:text-[#444]", "group-[&:hover]:text-[#888]"]
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
        {isModified && <div className="text-[16px]">*</div>}
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
