import { ReactNode } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicListItemProps {
  id: string;
  prevReactNode?: ReactNode;
  postReactNode?: ReactNode;
  textReactNode?: React.ReactNode;
  isSelected?: boolean;
  onClicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onContextMenuClicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  listContainerStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
  prevStyle?: ComponentStyleMerging;
  postStyle?: ComponentStyleMerging;
}

export const BasicListItem: React.FC<BasicListItemProps> = ({
  textReactNode,
  prevReactNode,
  postReactNode,
  isSelected,
  onClicked,
  onContextMenuClicked,
  listContainerStyle,
  textStyle,
  prevStyle,
  postStyle,
}) => {
  const _listContainerStyle = MergeComponentStyle(
    {
      css: classNames(
        ["flex items-center", "w-[100%] h-[32px]", "text-[#333]", "bg-[#fff0]"],
        ["[&]:hover:text-[#333]", "[&]:hover:bg-[#9ff8]"],
        [
          "[&[data-selected='true']]:text-[color:#00f]",
          "[&[data-selected='true']]:bg-[color:#9ff]",
        ]
      ),
    },
    listContainerStyle
  );

  const _prevStyle = MergeComponentStyle({}, prevStyle);

  const _textStyle = MergeComponentStyle(
    {
      css: "grow",
    },
    textStyle
  );

  const _postStyle = MergeComponentStyle({}, postStyle);

  return (
    <button
      data-selected={isSelected}
      style={_listContainerStyle.style}
      className={_listContainerStyle.css}
      onClick={onClicked}
      onContextMenuCapture={onContextMenuClicked}
    >
      {/* PREV React Node */}
      {prevReactNode && (
        <div className={_prevStyle.css} style={_prevStyle.style}>
          {prevReactNode}
        </div>
      )}

      {/* Text React Node */}
      <div className={_textStyle.css} style={_textStyle.style}>
        {textReactNode}
      </div>

      {/* POST React Node */}
      {postReactNode && (
        <div className={_postStyle.css} style={_postStyle.style}>
          {postReactNode}
        </div>
      )}
    </button>
  );
};

export default BasicListItem;
