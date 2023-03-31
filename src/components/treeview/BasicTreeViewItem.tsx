import { TreeViewItemProps } from "./TreeViewItemProps";
import classNames from "classnames";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

const TreeItemStyle = {
  hoveredBgColor: "rgba(153, 255, 255, 0.5)",
  unhoveredBgColor: "rgba(0, 0, 0, 0)",
  highlightColor: "rgb(0, 0, 255)",
  unhighlightColor: "rgb(50, 50, 50)",
  expandableColor: "rgb(0, 0, 0)",
};

export interface BasicTreeViewItemProps
  extends TreeViewItemProps<BasicTreeViewItemProps> {}

const BasicTreeViewItem: React.FC<BasicTreeViewItemProps> = ({
  name,
  icon,
  children,
  isExpanded,
  isSelected,
  isHovered,
  onClicked,
  onHovered,
  onUnhovered,
  onContextMenuClicked,
}) => {
  const vbarClasses = classNames("bg-blue-700 w-1 h-auto", {
    collapse: !isSelected,
  });

  const classes = classNames(
    "font-semibold",
    "py-3 w-full",
    "flex items-center rounded",
    {
      "pl-8 text-sm": !children,
      "text-base": children,
    }
  );

  const arrowClasses = classNames("mr-1");

  const style = {
    backgroundColor: (() => {
      if (isHovered || isSelected) return TreeItemStyle.hoveredBgColor;
      return TreeItemStyle.unhoveredBgColor;
    })(),
    color: (() => {
      if (children) {
        return TreeItemStyle.expandableColor;
      } else {
        if (isSelected) return TreeItemStyle.highlightColor;
        return TreeItemStyle.unhighlightColor;
      }
    })(),
  };

  return (
    <div className="flex">
      <button
        style={style}
        className={classes}
        onClick={() => onClicked?.()}
        onMouseEnter={() => onHovered?.()}
        onMouseLeave={() => onUnhovered?.()}
        onContextMenuCapture={(evt) =>
          onContextMenuClicked?.({ x: evt.clientX, y: evt.clientY })
        }
      >
        {children &&
          (isExpanded ? (
            <AiFillCaretDown className={arrowClasses} />
          ) : (
            <AiFillCaretRight className={arrowClasses} />
          ))}
        {icon && <img src={icon} className="mx-2 shrink-0" alt={name} />}
        <div className="flex flex-col items-start shrink-0">{name}</div>
      </button>
      <div className={vbarClasses} data-testid={"vbar"}>
        &nbsp;
      </div>
    </div>
  );
};

export default BasicTreeViewItem;
