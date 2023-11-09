import classNames from "classnames";
import ToolTip, { ToolTipPosition, ToolTipProps } from "../tooltip/ToolTip";

export interface IconWrapperProps
  extends Omit<ToolTipProps, "backgroundColor" | "fontColor"> {
  size?: number;
  tooltipBackgroundColor?: string;
  tooltipFontColor?: string;
  animation?: "rotate" | "bounce" | "pulse" | "ping";
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  size = 24,
  children,
  tooltip,
  tooltipBackgroundColor,
  tooltipFontColor,
  animation,
  ...others
}) => {
  function getWrapperIcon() {
    return (
      <div
        className={classNames({
          "animate-spin": animation === "rotate",
          "animate-bounce": animation === "bounce",
          "animate-pulse": animation === "pulse",
          "animate-ping": animation === "ping",
        })}
        style={{ width: size, height: size }}
      >
        {children}
      </div>
    );
  }

  return tooltip ? (
    <ToolTip
      tooltip={tooltip}
      backgroundColor={tooltipBackgroundColor}
      fontColor={tooltipFontColor}
      {...others}
    >
      {getWrapperIcon()}
    </ToolTip>
  ) : (
    getWrapperIcon()
  );
};

export default IconWrapper;
