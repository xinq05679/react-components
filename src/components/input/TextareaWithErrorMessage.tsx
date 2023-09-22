import classNames from "classnames";
import { BiError } from "react-icons/bi";
import Textarea, { TextareaProps } from "./Textarea";
import { ComponentStyleMerging } from "../../..";
import { MergeComponentStyle } from "../../..";

export interface TextareaWithErrorMessageProps extends TextareaProps {
  errorMessage?: React.ReactNode;
  hideErrorIcon?: boolean;
}

export const TextareaWithErrorMessage: React.FC<
  TextareaWithErrorMessageProps
> = ({ errorMessage, textareaStyle, hideErrorIcon, ...others }) => {
  const _textareaStyle = MergeComponentStyle(
    {
      css: classNames({
        "border-[#f09b11] hover:border-[#f09b11] focus:border-[#f09b11]":
          errorMessage,
      }),
    },
    // @ts-ignore
    textareaStyle
  );

  const _errorMessageStyle = {
    css: classNames("flex items-start", "text-sm text-[#f00]/80 text-start"),
  } as ComponentStyleMerging;

  const _errorMessageIconStyle = {
    css: classNames("shrink-0", "me-1", "w-[18px] h-[18px]"),
  } as ComponentStyleMerging;

  return (
    <div className={classNames("flex flex-col")}>
      <Textarea textareaStyle={_textareaStyle} {...others} />
      {/* Error Message */}
      {errorMessage && (
        <div
          className={_errorMessageStyle.css}
          style={_errorMessageStyle.style}
        >
          <BiError
            className={classNames(_errorMessageIconStyle.css, {
              hidden: hideErrorIcon,
            })}
            style={_errorMessageIconStyle.style}
          />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextareaWithErrorMessage;
