import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { useState } from "react";

export enum CheckBoxStatus {
  unchecked = 0,
  checked,
  indeterminate,
}

export interface BasicCheckBoxProps {
  id?: string;
  name?: string;
  text?: React.ReactNode;
  checked?: CheckBoxStatus;
  onCheckedChagned?: (checked: CheckBoxStatus) => void;
  containerStyle?: ComponentStyleMerging;
  inputStyle?: ComponentStyleMerging;
  labelStyle?: ComponentStyleMerging;
  indeterminate?: boolean;
  readOnly?: boolean;
}

export const BasicCheckBox: React.FC<BasicCheckBoxProps> = ({
  id = crypto.randomUUID(),
  name,
  text,
  checked = CheckBoxStatus.unchecked,
  onCheckedChagned,
  containerStyle,
  inputStyle,
  labelStyle,
  indeterminate = false,
  readOnly,
}) => {
  const _containerStyle = MergeComponentStyle(
    { css: classNames("flex gap-[5px] items-center", "text-[14px]") },
    containerStyle
  );

  const _inputStyle = MergeComponentStyle(
    {
      css: classNames(
        "relative",
        "cursor-pointer",
        "rounded-sm",
        "w-[20px] h-[20px]",
        [
          "data-[checked='2']:after:content-['-']",
          "data-[checked='1']:after:content-[&#10004;]",
          "after:absolute",
          "after:rounded-sm",
          "after:w-[20px] after:h-[20px]",
          "after:border after:border-[#888]",
          "after:hover:border-[#00f]",
          "after:text-[#fff]",
          "after:bg-[#fff]",
        ],
        [
          "[&[data-readonly='true']]:after:bg-[#ccc]",
          "[&[data-readonly='true']]:after:hover:border-[#888]",
          "[&[data-readonly='true']]:cursor-default",
          "[&[data-readonly='true']]:accent-[#ccc]",
        ]
      ),
    },
    inputStyle
  );

  const _labelStyle = MergeComponentStyle(
    {
      css: classNames("cursor-pointer", [
        "[&[data-readonly='true']]:cursor-default",
      ]),
    },
    labelStyle
  );

  const handleValueChanged = () => {
    if (readOnly) return;

    let updatedCheckState = checked;

    switch (updatedCheckState) {
      case CheckBoxStatus.checked:
        updatedCheckState = indeterminate
          ? CheckBoxStatus.indeterminate
          : CheckBoxStatus.unchecked;
        break;
      case CheckBoxStatus.unchecked:
        updatedCheckState = CheckBoxStatus.checked;
        break;
      case CheckBoxStatus.indeterminate:
        updatedCheckState = CheckBoxStatus.unchecked;
        break;
    }
    onCheckedChagned?.(updatedCheckState);
  };

  return (
    <>
      <div
        key={`checkbox-${id}`}
        className={_containerStyle.css}
        style={_containerStyle.style}
      >
        <input
          data-readonly={readOnly}
          data-checked={checked.toString()}
          className={_inputStyle.css}
          style={_inputStyle.style}
          type="checkbox"
          id={id}
          name={name}
          checked={checked !== CheckBoxStatus.unchecked}
          onChange={handleValueChanged}
        />
        <label
          data-readonly={readOnly}
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
