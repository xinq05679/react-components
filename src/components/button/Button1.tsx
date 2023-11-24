import classNames from "classnames";
import { MergeComponentStyle } from "../../..";
import Button, { ButtonProps } from "./Button";
import { forwardRef } from "react";
import SpinSVG from "../svgs/SpinSVG";

export interface Button1Props extends ButtonProps {
  enableClickOnBusy?: boolean;
  busy?: boolean;
  busyButtonColor?: string;
  busyButtonBorderColor?: string;
  busyTextColor?: string;
  spinSize?: number;
  spinTransform?: string;
  spinArcColor?: string;
  spinCircleColor?: string;
  spinStorkWidth?: number;
}

export const Button1: React.FC<Button1Props> = forwardRef<
  HTMLButtonElement,
  Button1Props
>(
  (
    {
      text,
      children,
      enableClickOnBusy = false,
      busy = false,
      busyButtonColor = "#acacac",
      busyButtonBorderColor = "#acacac",
      busyTextColor = "#fff",
      spinSize = 24,
      spinTransform = "translate(-5px)",
      spinArcColor = "#9ca3af",
      spinCircleColor,
      spinStorkWidth,
      customizedStyle,
      onClicked,
      ...others
    },
    ref
  ) => {
    const _btnCustomizedStyle = MergeComponentStyle(
      {
        css: classNames({
          "cursor-default text-disable hover:bg-currentColor active:bg-currentColor":
            busy,
        }),
        style: {
          backgroundColor: busy ? busyButtonColor : "",
          color: busy ? busyTextColor : "",
          borderColor: busy ? busyButtonBorderColor : "",
        },
      },
      // @ts-ignore
      customizedStyle
    );

    return (
      <Button
        ref={ref}
        {...others}
        customizedStyle={_btnCustomizedStyle}
        onClicked={() => {
          if (!busy || (busy && enableClickOnBusy)) onClicked?.();
        }}
      >
        <div className={classNames("flex items-center justify-center")}>
          {busy && (
            <div
              style={{
                transform: spinTransform,
              }}
            >
              <SpinSVG
                animation="rotate"
                arcColor={spinArcColor}
                circleColor={spinCircleColor}
                storkWidth={spinStorkWidth}
                size={spinSize}
              />
            </div>
          )}
          {children || text}
        </div>
      </Button>
    );
  }
);
export default Button1;
