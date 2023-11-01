import classNames from "classnames";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { useState, useRef, forwardRef, InputHTMLAttributes } from "react";

export interface TextInputProps {
  value?: string;
  name?: string;
  type?: "text" | "password";
  placeholder?: string;
  onValueChanged?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputStyle?: ComponentStyleMerging;
  enableSelectAll?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  spellCheck?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      value = "",
      inputStyle,
      enableSelectAll,
      onValueChanged,
      onSubmit,
      onFocus,
      ...others
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [submitValue, setSubmitValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    if (submitValue !== value) {
      setInputValue(value);
      setSubmitValue(value);
    }

    const _inputStyle = MergeComponentStyle(
      {
        css: classNames(
          [
            "text-[16px]",
            "h-[32px] w-[100%]",
            "outline-0",
            "border border-[#888] rounded-md",
            "cursor-pointer",
            "pl-[5px]",
            "grow",
          ],
          ["hover:border-[#00f]", "focus:border-[#00f]", "focus:cursor-auto"],
          [
            "[&[readOnly]]:bg-[#eee]",
            "[&[readOnly]]:border-[#ddd]",
            "[&[readOnly]]:text-[#888]",
            "[&[readOnly]]:cursor-auto",
          ],
          // Placeholder Style
          ["placeholder:text-[#888]", "placeholder:text-center"]
        ),
      },
      inputStyle
    );

    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      onValueChanged?.(event.target.value);
    };

    const handleSubmit = () => {
      if (submitValue !== inputValue) {
        setSubmitValue(inputValue);
        onSubmit?.(inputValue);
      }
    };

    return (
      <input
        {...others}
        ref={(el) => {
          // @ts-ignore
          inputRef.current = el;
          // @ts-ignore
          if (ref) ref.current = el;
        }}
        className={_inputStyle.css}
        style={_inputStyle.style}
        value={inputValue}
        onChange={handleValueChanged}
        onClick={() => {
          // @ts-ignore
          if (enableSelectAll) inputRef.current?.select();
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            inputRef.current?.blur();
          }
        }}
        onBlur={() => {
          handleSubmit();
        }}
      />
    );
  }
);

export default TextInput;
