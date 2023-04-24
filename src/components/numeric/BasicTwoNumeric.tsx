import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicNumeric, { BasicNumericProps } from "./BasicNumeric";
import { NumericRange } from "../../metadata/NumericRange";
import { useState, useEffect } from "react";

const _initValue = {
  min: 10,
  max: 50,
};

export interface BasicTwoNumericProps<T extends BasicNumericProps> {
  range?: NumericRange;
  initValue?: NumericRange;
  onValueChanged?: (range: NumericRange) => void;
  NumericFC?: React.FC<T>;
  containerStyle?: ComponentStyleMerging;
  onlyInteger?: boolean;
  digits?: number;
}

export function BasicTwoNumeric<T extends BasicNumericProps>(
  props: BasicTwoNumericProps<T>
) {
  const {
    range = { min: 0, max: 100 },
    initValue = _initValue,
    onValueChanged,
    NumericFC = BasicNumeric,
    containerStyle,
    digits = -1,
    onlyInteger,
  } = props;

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    if (initValue.max !== value.max || initValue.min !== value.min) {
      setValue(initValue);
    }
  }, [initValue]);

  const _containerStyle = MergeComponentStyle(
    { css: classNames("flex gap-[5px]") },
    containerStyle
  );

  const handleRangeChaned = (newValue: NumericRange) => {
    setValue(newValue);
    onValueChanged?.(newValue);
  };

  return (
    <>
      <div className={_containerStyle.css} style={_containerStyle.style}>
        <NumericFC
          {...({
            range: { min: range.min, max: value.max },
            initValue: value.min,
            onValueChanged: (min: number) => {
              handleRangeChaned({ min, max: value.max });
            },
            onlyInteger,
            digits,
          } as T)}
        />
        <div>-</div>
        <NumericFC
          {...({
            range: { min: value.min, max: range.max },
            initValue: value.max,
            onValueChanged: (max: number) => {
              handleRangeChaned({ min: value.min, max });
            },
            onlyInteger,
            digits,
          } as T)}
        />
      </div>
    </>
  );
}

export default BasicTwoNumeric;
