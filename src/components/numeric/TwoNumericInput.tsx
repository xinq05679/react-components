import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { NumericRange } from "../../metadata/NumericRange";
import { useState, useEffect } from "react";
import NumericInput, { NumericInputProps } from "./NumericInput";

export interface TwoNumericInputProps
  extends Omit<
    NumericInputProps,
    "value" | "onValueChanged" | "id" | "name" | "readOnly"
  > {
  value?: NumericRange;
  id?: {
    l: string;
    r: string;
  };
  name?: {
    l?: string;
    r?: string;
  };
  readOnly?: {
    l?: boolean;
    r?: boolean;
  };
  containerStyle?: ComponentStyleMerging;
  onValueChanged?: (range: NumericRange) => void;
}

export const TwoNumericInput: React.FC<TwoNumericInputProps> = ({
  value = {
    min: 10,
    max: 50,
  },
  id = {
    l: crypto.randomUUID(),
    r: crypto.randomUUID(),
  },
  name,
  range = { min: 0, max: 100 },
  readOnly,
  containerStyle,
  onValueChanged,
  ...others
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (value.max !== inputValue.max || value.min !== inputValue.min) {
      setInputValue(value);
    }
  }, [value]);

  const _containerStyle = MergeComponentStyle(
    { css: classNames("flex gap-[5px]") },
    containerStyle
  );

  const handleRangeChaned = (newValue: NumericRange) => {
    setInputValue(newValue);
    onValueChanged?.(newValue);
  };

  return (
    <>
      <div className={_containerStyle.css} style={_containerStyle.style}>
        <NumericInput
          id={id.l}
          name={name?.l || ""}
          range={{ min: range.min, max: value.max }}
          value={value.min}
          readOnly={readOnly?.l}
          onValueChanged={(min: number) => {
            handleRangeChaned({ min, max: value.max });
          }}
          {...others}
        />
        <div>-</div>
        <NumericInput
          id={id.r}
          name={name?.r || ""}
          range={{ min: value.min, max: range.max }}
          value={value.max}
          readOnly={readOnly?.r}
          onValueChanged={(max: number) => {
            handleRangeChaned({ min: value.min, max });
          }}
          {...others}
        />
      </div>
    </>
  );
};

export default TwoNumericInput;
