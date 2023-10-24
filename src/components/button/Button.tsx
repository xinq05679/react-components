import { forwardRef } from "react";
import { ButtonType } from "../../metadata/ButtonType";
import {
  ComponentStyle,
  ComponentStyleMerging,
} from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface ButtonProps
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  buttonType?: ButtonType;
  text?: string;
  children?: React.ReactNode;
  onClicked?: () => void;
  outline?: boolean;
  customizedStyle?: ComponentStyleMerging;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      type = "button",
      buttonType = ButtonType.Primary,
      text,
      children,
      onClicked,
      outline,
      customizedStyle,
      ...others
    },
    ref
  ) => {
    let buttonStyle: ComponentStyle = {
      css: "border rounded-md font-bold w-28 h-12",
    };

    switch (buttonType) {
      case ButtonType.Secondary:
        buttonStyle.css = classNames(buttonStyle.css, "border-[#6c757d]", {
          "text-[#fff] bg-[#6c757d] hover:bg-[#5c636a] active:bg-[#565e64]":
            !outline,
          "text-[#6c757d] hover:text-[#fff] bg-inherit hover:bg-[#6c757d]":
            outline,
        });
        break;
      case ButtonType.Success:
        buttonStyle.css = classNames(buttonStyle.css, "border-[#198754]", {
          "text-[#fff] bg-[#198754] hover:bg-[#157347] active:bg-[#146c43]":
            !outline,
          "text-[#198754] hover:text-[#fff] bg-inherit hover:bg-[#198754]":
            outline,
        });
        break;
      case ButtonType.Danger:
        buttonStyle.css = classNames(buttonStyle.css, "border-[#dc3545]", {
          "text-[#fff] bg-[#dc3545] hover:bg-[#bb2d3b] active:bg-[#b02a37]":
            !outline,
          "text-[#dc3545] hover:text-[#fff] bg-inherit hover:bg-[#dc3545]":
            outline,
        });
        break;
      case ButtonType.Warning:
        buttonStyle.css = classNames(buttonStyle.css, "border-[#ffc107]", {
          "text-[#000] bg-[#ffc107] hover:bg-[#ffca2c] active:bg-[#ffcd39]":
            !outline,
          "text-[#ffc107] hover:text-[#000] bg-inherit hover:bg-[#ffc107]":
            outline,
        });
        break;
      case ButtonType.Info:
        buttonStyle.css = classNames(buttonStyle.css, "border-[#0dcaf0]", {
          "text-[#000] bg-[#0dcaf0] hover:bg-[#31d2f2] active:bg-[#3dd5f3]":
            !outline,
          "text-[#0dcaf0] hover:text-[#000] bg-inherit hover:bg-[#0dcaf0]":
            outline,
        });
        break;
      case ButtonType.Dark:
        buttonStyle.css = classNames(buttonStyle.css, "border-[#212529]", {
          "text-[#fff] bg-[#212529] hover:bg-[#424649] active:bg-[#4d5154]":
            !outline,
          "text-[#000] hover:text-[#fff] bg-inherit hover:bg-[#212529]":
            outline,
        });
        break;
      default: // ButtonType.Primary
        buttonStyle.css = classNames(buttonStyle.css, "border-[#0d6efd]", {
          "text-[#fff] bg-[#0d6efd] hover:bg-[#0b5ed7] active:bg-[#0a58ca]":
            !outline,
          "text-[#0d6efd] hover:text-[#fff] bg-inherit hover:bg-[#0d6efd]":
            outline,
        });
        break;
    }

    buttonStyle = MergeComponentStyle(buttonStyle, customizedStyle);

    return (
      <button
        ref={ref}
        className={buttonStyle.css}
        style={buttonStyle.style}
        onClick={onClicked}
        {...others}
      >
        {children || text}
      </button>
    );
  }
);

export default Button;
