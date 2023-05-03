import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { convertNumberToString } from "../../utility/conversionUtility";
import { NumericRange } from "../../metadata/NumericRange";

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
  enableSelectAll?: boolean;
  readOnly?: boolean;
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

  function formatNumber(value: number) {
    return convertNumberToString({
      value,
      digits,
      onlyInteger,
    });
  }

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex gap-[5px] items-center",
        "w-[100%] h-[32px]",
        "text-[16px]"
      ),
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
        ["border border-[#ddd]", "hover:border-[#00f]", "focus:border-[#00f]"],
        [
          "[&[readOnly]]:bg-[#ccc]",
          "[&[readOnly]]:hover:border-0",
          "[&[readOnly]]:focus:border-0",
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
    let inputValue = parseFloat(value);

    if (isNaN(inputValue) || inputValue < range.min || inputValue > range.max) {
      return setValue(oldValue);
    }

    // Update the showing value
    const formedValue = formatNumber(inputValue);

    setOldValue(formedValue);
    setValue(formedValue);

    if (formedValue !== oldValue) {
      onValueChanged?.(parseFloat(formedValue));
    }
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
          onClick={() => {
            if (enableSelectAll) inputRef.current?.select();
          }}
          onDrop={(event) => {
            event.preventDefault();
          }}
          value={value}
          min={range.min}
          max={range.max}
          readOnly={readOnly}
        />
        <input ref={submitRef} type="submit" className="hidden" />
      </form>
    </>
  );
};

export default BasicNumeric;
