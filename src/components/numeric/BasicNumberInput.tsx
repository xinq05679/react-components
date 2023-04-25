import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { convertNumberToString } from "../../utility/conversionUtility";
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

  function formatNumber(value: string) {
    if (value.replaceAll(" ", "") === "") return "";

    return convertNumberToString({
      value: parseFloat(value),
      digits,
      onlyInteger,
    });
  }

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("flex items-center", "w-[100%]", "text-[16px]"),
    },
    containerStyle
  );

  const _inputStyle = MergeComponentStyle(
    {
      css: classNames(
        "w-[100%]",
        "outline-0",
        "h-[32px]",
        "text-[16px] text-center",
        "cursor-pointer",
        "border border-[#ddd]",
        "hover:border-[#00f]",
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
    onValueChanged?.(formedValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={_containerStyle.css}
      style={_containerStyle.style}
      noValidate
    >
      <input
        className={_inputStyle.css}
        style={_inputStyle.style}
        type={"text"}
        id={id}
        onChange={handleValueChanged}
        onBlur={handleBlue}
        onDrop={(event) => {
          event.preventDefault();
        }}
        value={value}
      />
      <input ref={submitRef} type="submit" className="hidden" />
    </form>
  );
};

export default BasicNumberInput;
