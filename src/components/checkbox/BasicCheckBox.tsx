import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { useState, useEffect } from "react";

export enum CheckBoxStatus {
  checked = 0,
  unchecked,
  indeterminate,
}

export interface BasicCheckBoxProps {
  id?: string;
  text?: React.ReactNode;
  checked?: CheckBoxStatus;
  onCheckedChagned?: (checked: CheckBoxStatus) => void;
  containerStyle?: ComponentStyleMerging;
  inputStyle?: ComponentStyleMerging;
  labelStyle?: ComponentStyleMerging;
  indeterminate?: boolean;
}

export const BasicCheckBox: React.FC<BasicCheckBoxProps> = ({
  id = crypto.randomUUID(),
  text,
  checked = CheckBoxStatus.unchecked,
  onCheckedChagned,
  containerStyle,
  inputStyle,
  labelStyle,
  indeterminate = false,
}) => {
  const [value, setValue] = useState(checked);

  useEffect(() => {
    if (checked != value) {
      setValue(checked);
    }
  }, [checked]);

  const _containerStyle = MergeComponentStyle(
    { css: classNames("flex gap-[5px] items-center", "text-[14px]") },
    containerStyle
  );

  const _inputStyle = MergeComponentStyle(
    {
      css: classNames("relative", "cursor-pointer", "w-[20px] h-[20px]", [
        "after:absolute",
        "after:flex after:items-center after:justify-center",
        "after:w-[20px] after:h-[20px]",
        "after:border after:border-[#888]",
        "after:hover:border-[#00f]",
        "after:text-[#fff]",
        "after:bg-[#fff]",
        "checked:after:bg-[#0075ff]",
        "data-[checked='2']:after:content-['-']",
        "data-[checked='0']:after:content-[&#10004;]",
      ]),
    },
    inputStyle
  );

  const _labelStyle = MergeComponentStyle(
    {
      css: classNames("cursor-pointer"),
    },
    labelStyle
  );

  const handleValueChanged = () => {
    let _checked = value;

    switch (_checked) {
      case CheckBoxStatus.checked:
        _checked = indeterminate
          ? CheckBoxStatus.indeterminate
          : CheckBoxStatus.unchecked;
        break;
      case CheckBoxStatus.unchecked:
        _checked = CheckBoxStatus.checked;
        break;
      case CheckBoxStatus.indeterminate:
        _checked = CheckBoxStatus.unchecked;
        break;
    }

    setValue(_checked);

    onCheckedChagned?.(_checked);
  };

  return (
    <>
      <div
        key={`checkbox-${id}`}
        className={_containerStyle.css}
        style={_containerStyle.style}
      >
        <input
          data-checked={value.toString()}
          className={_inputStyle.css}
          style={_inputStyle.style}
          type="checkbox"
          id={id}
          checked={value !== CheckBoxStatus.unchecked}
          onChange={handleValueChanged}
        />
        <label
          className={_labelStyle.css}
          style={_labelStyle.style}
          htmlFor={id}
        >
          {text}
        </label>
      </div>
    </>
  );
};

export default BasicCheckBox;
