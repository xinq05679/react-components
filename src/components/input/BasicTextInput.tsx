import classNames from "classnames";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { useState, useRef, forwardRef, createRef } from "react";

export interface BasicTextInputProps {
  value?: string;
  type?: "text" | "password";
  placeholder?: string;
  onValueChanged?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  formStyle?: ComponentStyleMerging;
  inputStyle?: ComponentStyleMerging;
  enableSelectAll?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
}

export const BasicTextInput = forwardRef<HTMLInputElement, BasicTextInputProps>(
  (
    {
      value = "",
      type = "text",
      placeholder = "",
      formStyle,
      inputStyle,
      enableSelectAll,
      readOnly,
      autoFocus,
      onValueChanged,
      onSubmit,
      onFocus,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [submitValue, setSubmitValue] = useState("");
    const submitRef = useRef<HTMLInputElement>(null);

    if (submitValue !== value) {
      setInputValue(value);
      setSubmitValue(value);
    }

    const _formStyle = MergeComponentStyle(
      {
        css: classNames(
          "flex items-center",
          "h-[32px] w-[100%]",
          "text-[16px]"
        ),
      },
      formStyle
    );

    const _inputStyle = MergeComponentStyle(
      {
        css: classNames(
          [
            "h-[100%]",
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (submitValue !== inputValue) {
        setSubmitValue(inputValue);
        onSubmit?.(inputValue);
      }
    };

    return (
      <form
        className={_formStyle.css}
        style={_formStyle.style}
        onSubmit={handleSubmit}
      >
        <input
          readOnly={readOnly}
          ref={ref}
          className={_inputStyle.css}
          style={_inputStyle.style}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleValueChanged}
          onClick={() => {
            // @ts-ignore
            if (enableSelectAll) ref?.current?.select();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              // @ts-ignore
              ref?.current?.blur();
            }
          }}
          onBlur={() => {
            submitRef.current?.click();
          }}
          onFocus={onFocus}
          autoFocus={autoFocus}
        />
        <input ref={submitRef} type="submit" className="hidden" />
      </form>
    );
  }
);

export default BasicTextInput;
