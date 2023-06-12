import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ConversionUtiltiy } from "../../utility/conversionUtility";
import { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { NumericRange } from "../../metadata/NumericRange";

export interface BasicNumberInputProps {
  id?: string;
  initValue?: string;
  range?: NumericRange;
  onValueChanged?: (value: string) => void;
  containerStyle?: ComponentStyleMerging;
  inputStyle?: ComponentStyleMerging;
  onlyInteger?: boolean;
  digits?: number;
  enableSelectAll?: boolean;
  readOnly?: boolean;
}

export const BasicNumberInput: React.FC<BasicNumberInputProps> = ({
  id,
  initValue = "",
  range = { min: 0, max: 100 },
  onValueChanged,
  containerStyle,
  inputStyle,
  digits = -1,
  onlyInteger,
  enableSelectAll,
  readOnly,
}) => {
  const [value, setValue] = useState(formatNumber(initValue));
  const [oldValue, setOldValue] = useState(formatNumber(initValue));
  const submitRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const _initValue = formatNumber(initValue);

    if (_initValue !== value) {
      setValue(_initValue);
      setOldValue(_initValue);
    }
  }, [initValue]);

  function formatNumber(value: string) {
    if (value.replaceAll(" ", "") === "") return "";

    const number = parseFloat(value);
    if (isNaN(number)) {
      return "";
    } else {
      return ConversionUtiltiy.convertNumberToString({
        value: parseFloat(value),
        digits,
        onlyInteger,
      });
    }
  }

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("flex items-center", "w-[100%] h-[32px]", "text-[16px]"),
    },
    containerStyle
  );

  const _inputStyle = MergeComponentStyle(
    {
      css: classNames(
        "h-[100%]",
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
    setValue(event.currentTarget.value);
  };

  const handleBlue = (event: React.FocusEvent<HTMLInputElement>) => {
    submitRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if the value is vaild
    if (value.replaceAll(" ", "") !== "") {
      let inputValue = parseFloat(value);

      if (
        isNaN(inputValue) ||
        inputValue < range.min ||
        inputValue > range.max
      ) {
        return setValue(oldValue);
      }
    }

    // Update the showing value
    const formedValue = formatNumber(value);

    setOldValue(formedValue);
    setValue(formedValue);

    if (formedValue !== oldValue) {
      onValueChanged?.(formedValue);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={_containerStyle.css}
      style={_containerStyle.style}
      noValidate
    >
      <input
        ref={inputRef}
        className={_inputStyle.css}
        style={_inputStyle.style}
        type={"text"}
        id={id}
        onChange={handleValueChanged}
        onBlur={handleBlue}
        onClick={() => {
          if (enableSelectAll) inputRef.current?.select();
        }}
        onDrop={(event) => {
          event.preventDefault();
        }}
        value={value}
        readOnly={readOnly}
      />
      <input ref={submitRef} type="submit" className="hidden" />
    </form>
  );
};

export default BasicNumberInput;
