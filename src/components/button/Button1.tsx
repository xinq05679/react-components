import classNames from "classnames";
import { BasicSpin, MergeComponentStyle } from "../../..";
import Button, { ButtonProps } from "./Button";
import { forwardRef } from "react";

export interface Button1Props extends ButtonProps {
  enableClickOnBusy?: boolean;
  busy?: boolean;
  busyButtonColor?: string;
  busyButtonBorderColor?: string;
  busyTextColor?: string;
  spinHeight?: string;
  spinMargin?: string;
  strokeColor?: string;
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
      spinHeight = "24px",
      spinMargin = "0px 5px",
      strokeColor = "#9ca3af",
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
            <BasicSpin
              svgStyle={{
                style: { height: spinHeight, margin: spinMargin },
              }}
              arcStyle={{ style: { stroke: strokeColor } }}
            />
          )}
          {children || text}
        </div>
      </Button>
    );
  }
);
export default Button1;
