import { useState, useRef, useEffect } from "react";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { BsSearch } from "react-icons/bs";

export interface BasicSearchBarProps {
  text?: string;
  items?: string[];
  icon?: string;
  placeholder?: string;
  containerStyle?: ComponentStyleMerging;
  textboxStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  onChanged?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

export const BasicSearchTextBox: React.FC<BasicSearchBarProps> = ({
  text,
  containerStyle,
  textboxStyle,
  placeholder,
  icon,
  iconStyle,
  onChanged,
  onSubmit,
}) => {
  const [input, setInput] = useState(text || "");
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

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    onSubmit?.(input);
  };

  const _containerStyle = MergeComponentStyle(
    {
      css: "flex w-[100%] relative",
    },
    containerStyle
  );

  const _textboxStyle = MergeComponentStyle(
    {
      css: "border border-[#000] w-[100%] h-[100%] text-xl px-2 cursor-pointer rounded",
    },
    textboxStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "absolute right-0 h-[100%] p-2 cursor-pointer",
    },
    iconStyle
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={_containerStyle.css} style={_containerStyle.style}>
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
                return <BsSearch className="h-[100%]" size={iconHeight} />;
              return <img src={icon} width={iconHeight} />;
            })()}
          </div>
        </div>
      </form>
    </>
  );
};

export default BasicSearchTextBox;
