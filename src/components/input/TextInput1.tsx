import classNames from "classnames";
import { ComponentStyleMerging } from "../../..";
import BasicTextInput, { BasicTextInputProps } from "./BasicTextInput";
import { MergeComponentStyle } from "../../..";

export interface TextInput1Props extends BasicTextInputProps {
  icon?: React.ReactNode;
  errorMessage?: string;
  iconDivStyle?: ComponentStyleMerging;
  errorMessageStyle?: ComponentStyleMerging;
}

export const TextInput1: React.FC<TextInput1Props> = ({
  icon,
  errorMessage,
  iconDivStyle,
  ...others
}) => {
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
          "border-[#f00]": errorMessage,
          "hover:border-[#f00]": errorMessage,
          "focus:border-[#f00]": errorMessage,
        }
      ),
    },
    // @ts-ignore
    others.inputStyle
  );

  const _errorMessageStyle = MergeComponentStyle(
    {
      css: classNames("absolute bottom-[-24px]", "h-[24px]", "text-[#f00]"),
    },
    //@ts-ignore
    others.errorMessageStyle
  );

  return (
    <div className={classNames("relative", " w-[100%]", "flex items-center")}>
      {/* Image */}
      {icon && <div className={_iconDivStyle.css}>{icon}</div>}
      {/* Text Input */}
      <BasicTextInput {...others} inputStyle={_inputStyle} />
      {/* Error Message */}
      {errorMessage && (
        <div
          className={_errorMessageStyle.css}
          style={_errorMessageStyle.style}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextInput1;
