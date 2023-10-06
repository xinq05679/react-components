import classNames from "classnames";
import { ComponentStyleMerging } from "../../..";
import { BiError } from "react-icons/bi";

export interface ErrorMessageContainerProps {
  children?: React.ReactNode;
  errorMessage?: React.ReactNode;
  errorIcon?: React.ReactNode;
  hideErrorIcon?: boolean;
}

export const ErrorMessageContainer: React.FC<ErrorMessageContainerProps> = ({
  children,
  errorMessage,
  errorIcon,
  hideErrorIcon,
}) => {
  const _errorMessageStyle = {
    css: classNames(
      "relative",
      "h-full",
      "overflow-y-auto",
      "flex items-start",
      "text-sm text-[#f00]/80 text-start"
    ),
  } as ComponentStyleMerging;

  const _errorMessageIconStyle = {
    css: classNames("shrink-0", "me-1", "w-[18px] h-[18px]"),
  } as ComponentStyleMerging;

  return (
    <div className={classNames("flex flex-col", "h-full w-full")}>
      {children}
      {/* Error Message */}
      {errorMessage && (
        <div
          className={_errorMessageStyle.css}
          style={_errorMessageStyle.style}
        >
          {!hideErrorIcon &&
            (errorIcon || (
              <BiError
                className={classNames(_errorMessageIconStyle.css, {
                  hidden: hideErrorIcon,
                })}
                style={_errorMessageIconStyle.style}
              />
            ))}
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default ErrorMessageContainer;
