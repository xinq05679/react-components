import classNames from "classnames";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { useState, useRef } from "react";

export interface BasicTextInputProps {
  value: string;
  onValueChanged?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  formStyle?: ComponentStyleMerging;
  inputStyle?: ComponentStyleMerging;
  enableSelectAll?: boolean;
  readOnly?: boolean;
}

export const BasicTextInput: React.FC<BasicTextInputProps> = ({
  value,
  formStyle,
  inputStyle,
  enableSelectAll,
  readOnly,
  onValueChanged,
  onSubmit,
  onFocus,
}) => {
  const [textboxValue, setTextBoxValue] = useState(value);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  if (inputValue !== value) {
    setTextBoxValue(value);
    setInputValue(value);
  }

  const _formStyle = MergeComponentStyle(
    {
      css: classNames("flex items-center", "h-[32px] w-[100%]", "text-[16px]"),
    },
    formStyle
  );

  const _inputStyle = MergeComponentStyle(
    {
      css: classNames(
        [
          "h-[100%]",
          "outline-0",
          "border border-[#ddd]",
          "cursor-pointer",
          "pl-[5px]",
          "grow",
        ],
        ["hover:border-[#00f]", "focus:border-[#00f]", "focus:cursor-auto"],
        [
          "[&[readOnly]]:bg-[#ccc]",
          "[&[readOnly]]:hover:border-[#ddd]",
          "[&[readOnly]]:focus:border-[#ddd]",
          "[&[readOnly]]:cursor-auto",
        ]
      ),
    },
    inputStyle
  );

  const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextBoxValue(event.target.value);
    onValueChanged?.(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(textboxValue);
  };

  return (
    <form
      className={_formStyle.css}
      style={_formStyle.style}
      onSubmit={handleSubmit}
    >
      <input
        readOnly={readOnly}
        ref={inputRef}
        className={_inputStyle.css}
        style={_inputStyle.style}
        type="text"
        value={textboxValue}
        onChange={handleValueChanged}
        onClick={() => {
          if (enableSelectAll) inputRef.current?.select();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            inputRef.current?.blur();
          }
        }}
        onBlur={() => {
          submitRef.current?.click();
        }}
        onFocus={onFocus}
      />
      <input ref={submitRef} type="submit" className="hidden" />
    </form>
  );
};

export default BasicTextInput;
