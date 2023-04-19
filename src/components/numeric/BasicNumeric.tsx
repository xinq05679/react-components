import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { convertNumberToString } from "../../utility/conversionUtility";

export type NumericRange = { min: number; max: number };

export interface BasicNumericProps {
  id?: string;
  range?: NumericRange;
  initValue?: number;
  onValueChanged?: (value: number) => void;
  containerStyle?: ComponentStyleMerging;
  inputStyle?: ComponentStyleMerging;
  labelStyle?: ComponentStyleMerging;
  onlyInteger?: boolean;
  digits?: number;
}

export const BasicNumeric: React.FC<BasicNumericProps> = ({
  id = crypto.randomUUID(),
  range = { min: 0, max: 100 },
  initValue = 0.0,
  onValueChanged,
  containerStyle,
  inputStyle,
  digits = -1,
  onlyInteger,
}) => {
  const [value, setValue] = useState(formatNumber(initValue));
  const [oldValue, setOldValue] = useState(formatNumber(initValue));
  const submitRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const _initValue = formatNumber(initValue);

    if (_initValue !== value) {
      setValue(_initValue);
    }
  }, [initValue]);

  function formatNumber(value: number) {
    return convertNumberToString({
      value,
      digits,
      onlyInteger,
    });
  }

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("flex gap-[5px] items-center", "w-[100%]", "text-[16px]"),
    },
    containerStyle
  );

  const _inputStyle = MergeComponentStyle(
    {
      css: classNames(
        "grow",
        "outline-0",
        "h-[32px]",
        "text-[16px] text-center",
        "cursor-pointer",
        "border border-[#ddd]",
        "hover:border-[#444]",
        "focus:border-[#00f]"
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
    let inputValue = parseFloat(value);

    if (isNaN(inputValue) || inputValue < range.min || inputValue > range.max) {
      return setValue(oldValue);
    }

    // Update the showing value
    const formedValue = formatNumber(inputValue);

    setOldValue(formedValue);
    setValue(formedValue);
    onValueChanged?.(parseFloat(formedValue));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={_containerStyle.css}
        style={_containerStyle.style}
        noValidate
      >
        <input
          className={_inputStyle.css}
          style={_inputStyle.style}
          type={"number"}
          id={id}
          onChange={handleValueChanged}
          onBlur={handleBlue}
          value={value}
          min={range.min}
          max={range.max}
        />
        <input ref={submitRef} type="submit" className="hidden" />
      </form>
    </>
  );
};

export default BasicNumeric;
