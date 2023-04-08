import { useState, useRef, useEffect } from "react";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { BsSearch } from "react-icons/bs";

export interface BasicSearchBarProps {
  items?: string[];
  icon?: string;
  placeholder?: string;
  textboxStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  onChanged?: (value: string) => void;
}

export const BasicSearchTextBox: React.FC<BasicSearchBarProps> = ({
  textboxStyle,
  placeholder,
  icon,
  iconStyle,
  onChanged,
}) => {
  const [input, setInput] = useState("");
  const [iconHeight, setIconHeight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setIconHeight(inputRef.current?.clientHeight);
    } else {
      if (iconHeight != 0) {
        setIconHeight(0);
      }
    }
  }, []);

  const handleValueChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
    onChanged?.(evt.target.value);
  };

  const _textboxStyle = MergeComponentStyle(
    {
      css: "border border-[#000] w-full h-10 text-xl px-2 cursor-pointer rounded",
    },
    textboxStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "absolute right-0 h-full p-2 cursor-pointer",
    },
    iconStyle
  );

  return (
    <>
      <form>
        <div className="flex w-full relative">
          <input
            className={_textboxStyle.css}
            style={_textboxStyle.style}
            type="text"
            value={input}
            onChange={handleValueChanged}
            onFocus={(event) => event.target.select()}
            placeholder={placeholder}
            ref={inputRef}
          />
          <div
            className={_iconStyle.css}
            style={_iconStyle.style}
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            {(() => {
              if (!icon)
                return <BsSearch className="h-full" size={iconHeight} />;
              return <img src={icon} width={iconHeight} />;
            })()}
          </div>
        </div>
      </form>
    </>
  );
};

export default BasicSearchTextBox;
