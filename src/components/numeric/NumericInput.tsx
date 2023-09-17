import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ConversionUtiltiy } from "../../utility/conversionUtility";
import { NumericRange } from "../../metadata/NumericRange";

export interface NumericInputProps {
  id?: string;
  name?: string;
  range?: NumericRange;
  value?: number | "";
  onValueChanged?: (value: number | "") => void;
  inputStyle?: ComponentStyleMerging;
  labelStyle?: ComponentStyleMerging;
  onlyInteger?: boolean;
  digits?: number;
  enableSelectAll?: boolean;
  readOnly?: boolean;
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  (
    {
      id = crypto.randomUUID(),
      range = { min: 0, max: 100 },
      value = "",
      onValueChanged,
      inputStyle,
      digits = -1,
      onlyInteger,
      enableSelectAll,
      ...others
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(formatNumber(value));
    const [submitValue, setSubmitValue] = useState(formatNumber(value));
    const inputRef = useRef<HTMLInputElement>(null);

    if (submitValue !== formatNumber(value)) {
      setInputValue(formatNumber(value));
      setSubmitValue(formatNumber(value));
    }

    function formatNumber(value: number | "") {
      if (value === "") return "";
      return ConversionUtiltiy.convertNumberToString({
        value,
        digits,
        onlyInteger,
      });
    }

    const _inputStyle = MergeComponentStyle(
      {
        css: classNames(
          "text-[16px]",
          "w-[100%] h-[32px]",
          "grow",
          "outline-0",
          "text-center",
          "cursor-pointer",
          [
            "border border-[#888]",
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
      inputStyle
    );

    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.currentTarget.value);
    };

    const handleSubmit = () => {
      if (!inputValue.trim()) {
        setSubmitValue("");
        setInputValue("");
        onValueChanged?.("");
        return;
      }

      // Check if the value is vaild
      let _inputValue = parseFloat(inputValue);

      if (
        isNaN(_inputValue) ||
        (range?.min && _inputValue < range.min) ||
        (range?.max && _inputValue > range.max)
      ) {
        return setInputValue(submitValue);
      }

      // Update the showing value
      const _submitValue = formatNumber(_inputValue);

      setSubmitValue(_submitValue);
      setInputValue(_submitValue);

      onValueChanged?.(parseFloat(_submitValue));
    };

    return (
      <>
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
          type={"number"}
          id={id}
          onChange={handleValueChanged}
          onBlur={() => {
            handleSubmit();
          }}
          onClick={() => {
            if (enableSelectAll) inputRef.current?.select();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              inputRef.current?.blur();
            }
          }}
          onDrop={(event) => {
            event.preventDefault();
          }}
          value={inputValue}
          min={range.min}
          max={range.max}
        />
      </>
    );
  }
);

export default NumericInput;
