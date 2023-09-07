import classNames from "classnames";
import { BiError } from "react-icons/bi";
import { ComponentStyleMerging } from "../../..";
import BasicTextInput, { TextInputProps } from "./TextInput";
import { MergeComponentStyle } from "../../..";
import { forwardRef } from "react";

export interface TextInput1Props extends TextInputProps {
  icon?: React.ReactNode;
  errorMessage?: string;
  divStyle?: ComponentStyleMerging;
  iconDivStyle?: ComponentStyleMerging;
  errorMessageIconStyle?: ComponentStyleMerging;
  errorMessageStyle?: ComponentStyleMerging;
}

export const TextInput1 = forwardRef<HTMLInputElement, TextInput1Props>(
  ({ icon, errorMessage, iconDivStyle, ...others }, ref) => {
    const _iconDivStyle = MergeComponentStyle(
      {
        css: classNames("absolute left-[10px]", "w-[24px]"),
      },
      iconDivStyle
    );

    const _inputStyle = MergeComponentStyle(
      {
        css: classNames(
          { "pl-[40px]": icon },
          {
            "bg-[#fef7ea]": errorMessage,
            "border-[#f09b11]": errorMessage,
            "hover:border-[#f09b11]": errorMessage,
            "focus:border-[#f09b11]": errorMessage,
          }
        ),
      },
      // @ts-ignore
      others.inputStyle
    );

    const _errorMessageStyle = MergeComponentStyle(
      {
        css: classNames(
          "flex items-start",
          "absolute bottom-[-30px]",
          "h-[24px]",
          "text-sm text-[#f00]/80 text-start"
        ),
      },
      //@ts-ignore
      others.errorMessageStyle
    );

    const _divStyle = MergeComponentStyle(
      {
        css: classNames("relative", " w-[100%]", "flex items-center"),
      },
      //@ts-ignore
      others.divStyle
    );

    const _errorMessageIconStyle = MergeComponentStyle(
      {
        css: classNames("shrink-0", "me-1", "w-[18px] h-[18px]"),
      },
      //@ts-ignore
      others.errorMessageIconStyle
    );

    return (
      <div className={classNames(_divStyle.css)} style={_divStyle.style}>
        {/* Image */}
        {icon && <div className={_iconDivStyle.css}>{icon}</div>}
        {/* Text Input */}
        <BasicTextInput ref={ref} {...others} inputStyle={_inputStyle} />
        {/* Error Message */}
        {errorMessage && (
          <div
            className={_errorMessageStyle.css}
            style={_errorMessageStyle.style}
          >
            <BiError
              className={_errorMessageIconStyle.css}
              style={_errorMessageIconStyle.style}
            />
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

export default TextInput1;
