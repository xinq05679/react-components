import { useState, useRef, useEffect } from "react";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { BsSearch } from "react-icons/bs";
import classNames from "classnames";

export interface BasicSearchBarProps {
  text?: string;
  items?: string[];
  icon?: string;
  suffixText?: string;
  placeholder?: string;
  containerStyle?: ComponentStyleMerging;
  textboxStyle?: ComponentStyleMerging;
  suffixTextStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  onChanged?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClicked?: (event: React.MouseEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export const BasicSearchTextBox: React.FC<BasicSearchBarProps> = ({
  text = "",
  suffixText = "",
  containerStyle,
  suffixTextStyle,
  textboxStyle,
  placeholder = "",
  icon,
  iconStyle,
  onChanged,
  onSubmit,
  onClicked,
  readOnly,
}) => {
  const [input, setInput] = useState("");
  const [submitValue, setSubmitValue] = useState("");
  const suffixDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (submitValue !== text) {
    setInput(text);
    setSubmitValue(text);
  }

  const handleValueChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value);
    onChanged?.(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (submitValue !== input) {
      setSubmitValue(input);
      onSubmit?.(input);
    }
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
        "w-[100%] h-[32px] rounded-2xl",
        "pl-[40px]",
        "cursor-pointer",
        "rounded",
        "border border-[#888]",
        "hover:border-[#00f]",
        "focus:border-[#00f]",
        [
          "[&[readOnly]]:bg-[#eee]",
          "[&[readOnly]]:border-[#ddd]",
          "[&[readOnly]]:hover:border-[#ddd]",
          "[&[readOnly]]:focus:border-[#ddd]",
          "[&[readOnly]]:text-[#888]",
          "[&[readOnly]]:cursor-auto",
        ]
      ),
      style: {
        paddingRight: `${
          suffixDivRef.current
            ? suffixDivRef.current.clientWidth +
              suffixDivRef.current.getClientRects().length
            : 15
        }px`,
      },
    },
    textboxStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "absolute left-[10px] h-[24px] w-[24px] cursor-pointer",
    },
    iconStyle
  );

  const _suffixTextStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex items-center",
        "absolute right-0",
        //"rounded-r-2xl border-[#f00]", Add this line can change the background color of the suffix div which will fill up the right side of the input div.
        "h-full",
        "px-[15px]",
        "text-[#9ca3af]"
      ),
    },
    suffixTextStyle
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={_containerStyle.css}
        style={_containerStyle.style}
      >
        <input
          ref={inputRef}
          readOnly={readOnly}
          className={_textboxStyle.css}
          style={_textboxStyle.style}
          type="text"
          value={input}
          onChange={handleValueChanged}
          onFocus={(event) => event.target.select()}
          placeholder={placeholder}
          onDrop={(event) => {
            event.preventDefault();
          }}
          onClick={onClicked}
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
        {suffixText && (
          <div
            ref={suffixDivRef}
            className={classNames(_suffixTextStyle.css)}
            style={_suffixTextStyle.style}
          >
            {suffixText}
          </div>
        )}
      </form>
    </>
  );
};

export default BasicSearchTextBox;
