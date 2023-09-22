import classNames from "classnames";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export interface TextareaProps {
  text?: string;
  name?: string;
  textareaStyle?: ComponentStyleMerging;
  onValueChanged?: (value: string) => void;
  onSubmit?: (value: string) => void;
  readOnly?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  text = "",
  name,
  textareaStyle,
  onSubmit,
  onValueChanged,
  readOnly,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [submitValue, setSubmitValue] = useState("");

  if (submitValue !== text) {
    setSubmitValue(text);
    setInputValue(text);
  }

  const _textareaStyle = MergeComponentStyle(
    {
      css: classNames(
        [
          "h-[100%] w-[100%]",
          "resize-none",
          "outline-0",
          "border border-[#888]",
          "cursor-pointer",
          "p-[5px]",
        ],
        [
          "[&]:hover:border-[#00f]",
          "[&]:focus:border-[#00f]",
          "[&]:focus:cursor-auto",
        ],
        [
          "[&[readOnly]]:bg-[#eee]",
          "[&[readOnly]]:border-[#ddd]",
          "[&[readOnly]]:hover:border-[#ddd]",
          "[&[readOnly]]:focus:border-[#ddd]",
          "[&[readOnly]]:text-[#888]",
          "[&[readOnly]]:cursor-auto",
        ]
      ),
    },
    textareaStyle
  );

  function handleValueChanged(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    onValueChanged?.(event.target.value);
  }

  function handleSubmit() {
    if (submitValue !== inputValue) {
      setSubmitValue(inputValue);
      onSubmit?.(inputValue);
    }
  }

  return (
    <textarea
      value={inputValue}
      name={name}
      onChange={handleValueChanged}
      onBlur={handleSubmit}
      className={_textareaStyle.css}
      style={_textareaStyle.style}
      readOnly={readOnly}
    />
  );
};

export default Textarea;
