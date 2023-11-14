import classNames from "classnames";
import { useState, useRef, useEffect } from "react";

export interface ToggleButtonProps {
  on?: boolean;
  disable?: boolean;
  width?: number;
  height?: number;
  borderWidth?: number;
  borderColor?: string;
  onBackgrounColor?: string;
  onText?: string;
  onTextColor?: string;
  offText?: string;
  offBackgrounColor?: string;
  offTextColor?: string;
  ballSize?: number;
  ballXOffset?: number;
  ballBackgroundColor?: string;
  onClicked?: (status: boolean) => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  on = false,
  disable = false,
  width = 60,
  height = 25,
  borderWidth = 1,
  borderColor = "#fff",
  onBackgrounColor = "#33dc77",
  onText = "on",
  onTextColor = "#fff",
  offText = "off",
  offTextColor = "#fff",
  offBackgrounColor = "#f00",
  ballSize = 25,
  ballXOffset = 3,
  ballBackgroundColor = "#d1d0d0",
  onClicked,
}) => {
  const [_on, setOn] = useState<null | Boolean>();
  const ballRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOn(on);
  }, [on]);

  let offsetX = `translate(${-ballXOffset}px)`;
  if (divRef.current && ballRef.current && _on) {
    offsetX = `translate(${
      divRef.current.clientWidth - ballRef.current.clientWidth + ballXOffset
    }px)`;
  }

  return (
    <div
      ref={divRef}
      className={classNames(
        "flex items-center",
        "rounded-2xl",
        "relative",
        "select-none",
        {
          "cursor-pointer": !disable,
          "opacity-25": disable,
        }
      )}
      style={{
        width: width,
        height: height,
        background: _on ? onBackgrounColor : offBackgrounColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
      }}
      onClick={() => {
        if (disable) return;
        setOn(!_on);
        onClicked?.(!_on);
      }}
    >
      {/* On / Off Text */}
      <div
        className={classNames("w-full", "flex items-center grow", "px-[10px]")}
        style={{
          color: _on ? onTextColor : offTextColor,
          justifyContent: _on ? "start" : "end",
        }}
      >
        {_on ? onText : offText}
      </div>
      {/* Toggle Ball */}
      <div
        ref={ballRef}
        className={classNames("rounded-full", "shrink-0", "absolute")}
        style={{
          width: ballSize,
          height: ballSize,
          background: ballBackgroundColor,
          transform: offsetX,
        }}
      ></div>
    </div>
  );
};

export default ToggleButton;
