import { BasicListItemProps } from "./BasicListItemProps";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export const BasicListItem: React.FC<BasicListItemProps> = ({
  text,
  icon,
  isSelected,
  onClicked,
  onContextMenuClicked,
  listStyle,
  iconStyle,
  textStyle,
}) => {
  const _listStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex items-center rounded font-semibold py-3 w-full text-xl",
        "hover:text-[#333] hover:bg-[#9ff8]",
        {
          "text-[#00f] bg-[#9ff]": isSelected,
          "text-[#333] bg-[#fff0]": !isSelected,
        }
      ),
    },
    listStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "mx-2 shrink-0 grow-0",
    },
    iconStyle
  );

  const _textStyle = MergeComponentStyle(
    {
      css: "flex flex-col items-start shrink-0 grow",
    },
    textStyle
  );

  return (
    <div className="flex">
      <button
        style={_listStyle.style}
        className={_listStyle.css}
        onClick={() => onClicked?.()}
        onContextMenuCapture={(evt) =>
          onContextMenuClicked?.({ x: evt.clientX, y: evt.clientY })
        }
      >
        {icon && (
          <img
            src={icon}
            className={_iconStyle.css}
            style={_iconStyle.style}
            alt={text}
          />
        )}
        <div className={_textStyle.css} style={_textStyle.style}>
          {text}
        </div>
      </button>
    </div>
  );
};

export default BasicListItem;
