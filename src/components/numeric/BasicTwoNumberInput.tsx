import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicNumberInput from "./BasicNumberInput";
import { NumericRange } from "../../metadata/NumericRange";
import { useState, useEffect } from "react";
import { BasicNumberInputProps } from "./BasicNumberInput";

const _initValue = {
  left: "10",
  right: "50",
};

export interface BasicTwoNumberInputProps {
  range?: NumericRange;
  initValue?: { left: string; right: string };
  onValueChanged?: (value: { left: string; right: string }) => void;
  containerStyle?: ComponentStyleMerging;
  onlyInteger?: boolean;
  digits?: number;
  numberInputProps?: BasicNumberInputProps;
}

export const BasicTwoNumberInput: React.FC<BasicTwoNumberInputProps> = ({
  range = { min: 0, max: 100 },
  initValue = _initValue,
  onValueChanged,
  containerStyle,
  digits = -1,
  onlyInteger,
  numberInputProps,
}) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    if (initValue.left !== value.left || initValue.right !== value.right) {
      setValue(initValue);
    }
  }, [initValue]);

  const _containerStyle = MergeComponentStyle(
    { css: classNames("flex gap-[5px]") },
    containerStyle
  );

  const handleValueChaned = (left: string, right: string) => {
    setValue({ left, right });
    onValueChanged?.({ left, right });
  };

  return (
    <>
      <div className={_containerStyle.css} style={_containerStyle.style}>
        <BasicNumberInput
          range={{
            min: range.min,
            max:
              value.right.replaceAll(" ", "") !== ""
                ? parseFloat(value.right)
                : range.max,
          }}
          initValue={value.left}
          onValueChanged={(left: string) => {
            handleValueChaned(left, value.right);
          }}
          onlyInteger={onlyInteger}
          digits={digits}
          {...numberInputProps}
        />
        <div className="shrink-0">-</div>
        <BasicNumberInput
          range={{
            min: value.left.replaceAll(" ", "")
              ? parseFloat(value.left)
              : range.min,
            max: range.max,
          }}
          initValue={value.right}
          onValueChanged={(right: string) => {
            handleValueChaned(value.left, right);
          }}
          onlyInteger={onlyInteger}
          digits={digits}
          {...numberInputProps}
        />
      </div>
    </>
  );
};

export default BasicTwoNumberInput;
