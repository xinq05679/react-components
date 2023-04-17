import { BasicTreeViewItemProps } from "./BasicTreeViewItemProps";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import classNames from "classnames";
export const BasicTreeViewItem: React.FC<BasicTreeViewItemProps> = ({
  id,
  text,
  children,
  unselectable,
  isSelected,
  isExpanded,
  containerStyle,
  arrowStyle,
  textStyle,
  arrow,
  onClicked,
  onContextMenuClicked,
}) => {
  const _containerStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex shrink-0 items-center gap-[4px] h-[32px] w-[100%]",
        ["text-[#000]"],
        ["hover:bg-[#e5f3ff]"],
        [
          "data-[selected=true]:bg-[#cce8ff]",
          "data-[selected=true]:border-[#99d1ff]",
          "data-[selected=true]:border",
          "data-[selected=true]:font-semibold",
        ],
        [
          "data-[type=branch]:text-[16px]",
          "data-[type=branch]:font-bold",
          "data-[type=node]:text-[16px]",
        ]
      ),
    },
    containerStyle
  );

  const _arrowStyle = MergeComponentStyle(
    {
      css: "shrink-0 grow-0 text-[24px] text-[#000]",
    },
    arrowStyle
  );

  const _textStyle = MergeComponentStyle(
    {
      css: classNames("text-start shrink-0 grow"),
    },
    textStyle
  );

  const renderedArrow = () => {
    if (!children) return null;
    if (arrow) return arrow;

    return isExpanded ? (
      <AiFillCaretDown className={_arrowStyle.css} style={_arrowStyle.style} />
    ) : (
      <AiFillCaretRight className={_arrowStyle.css} style={_arrowStyle.style} />
    );
  };

  return (
    <button
      {...{
        "data-type": children ? "branch" : "node",
        "data-selected": isSelected,
      }}
      className={_containerStyle.css}
      style={_containerStyle.style}
      onClick={(event) => {
        onClicked?.({ event, id });
      }}
      onContextMenuCapture={(event) => {
        onContextMenuClicked?.({
          event,
          id,
          pos: { x: event.clientX, y: event.clientY },
        });
      }}
    >
      {/* ARROW */}
      {renderedArrow()}
      {/* TEXT */}
      <div className={_textStyle.css} style={_textStyle.style}>
        {text}
      </div>
    </button>
  );
};

export default BasicTreeViewItem;
