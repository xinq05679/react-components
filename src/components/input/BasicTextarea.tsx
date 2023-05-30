import { useRef, useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicTextarea {
  text?: string;
  textareaStyle?: ComponentStyleMerging;
  formStyle?: ComponentStyleMerging;
  onValueChanged?: (value: string) => void;
  onBlur?: (value: string) => void;
  readOnly?: boolean;
  [key: string]: any;
}

export const BasicTextarea: React.FC<BasicTextarea> = ({
  text = "",
  textareaStyle,
  formStyle,
  onValueChanged,
  onBlur,
  readOnly,
  ...others
}) => {
  const [inputValue, setInputValue] = useState(text);
  const btnRef = useRef<HTMLButtonElement>(null);

  const _textareaStyle = MergeComponentStyle(
    {
      css: classNames(
        [
          "h-[200px] w-[100%]",
          "resize-none",
          "outline-0",
          "border border-[#ddd]",
          "cursor-pointer",
        ],
        [
          "[&]:hover:border-[#00f]",
          "[&]:focus:border-[#00f]",
          "[&]:focus:cursor-auto",
        ],
        [
          "[&[readOnly]]:bg-[#ccc]",
          "[&[readOnly]]:hover:border-[#ddd]",
          "[&[readOnly]]:focus:border-[#ddd]",
          "[&[readOnly]]:cursor-auto",
        ]
      ),
    },
    textareaStyle
  );

  const _formStyle = MergeComponentStyle({ css: classNames("") }, formStyle);

  function handleValueChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    onValueChanged?.(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onBlur?.(inputValue);
  }

  function handleBlur() {
    btnRef.current?.click();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={_formStyle?.css}
      style={_formStyle?.style}
    >
      <textarea
        value={inputValue}
        onChange={handleValueChanged}
        onBlur={handleBlur}
        className={_textareaStyle.css}
        style={_textareaStyle.style}
        readOnly={readOnly}
        {...others}
      />
      <button ref={btnRef} className="hidden" type="submit" />
    </form>
  );
};

export default BasicTextarea;
