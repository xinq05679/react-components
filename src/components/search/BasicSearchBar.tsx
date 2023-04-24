import { useState, useRef, useEffect } from "react";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { BsSearch } from "react-icons/bs";
import classNames from "classnames";

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
  const inputRef = useRef<HTMLInputElement>(null);

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
      css: "flex w-[100%] relative items-center",
    },
    containerStyle
  );

  const _textboxStyle = MergeComponentStyle(
    {
      css: classNames(
        "outline-0",
        "w-[100%] h-[100%]",
        "text-xl",
        "px-2",
        "cursor-pointer",
        "rounded",
        "border border-[#ddd]",
        "[&:hover]:border-[#00f]",
        "[&:focus]:border-[#00f]"
      ),
    },
    textboxStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "absolute right-[5px] h-[100%] cursor-pointer",
    },
    iconStyle
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={_containerStyle.css}
        style={_containerStyle.style}
      >
        <input
          className={_textboxStyle.css}
          style={_textboxStyle.style}
          type="text"
          value={input}
          onChange={handleValueChanged}
          onFocus={(event) => event.target.select()}
          placeholder={placeholder}
          ref={inputRef}
          onDrop={(event) => {
            event.preventDefault();
          }}
        />
        {(() => {
          if (!icon)
            return (
              <BsSearch
                className={_iconStyle.css}
                style={_iconStyle.style}
                onClick={() => {
                  inputRef.current?.focus();
                }}
              />
            );
          return (
            <img
              className={_iconStyle.css}
              style={_iconStyle.style}
              onClick={() => {
                inputRef.current?.focus();
              }}
              src={icon}
            />
          );
        })()}
      </form>
    </>
  );
};

export default BasicSearchTextBox;
