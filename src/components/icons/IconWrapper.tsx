import classNames from "classnames";
import ToolTip, { ToolTipProps } from "../tooltip/ToolTip";

export interface IconWrapperProps extends ToolTipProps {
  size?: number;
  color?: string;
  animation?: "rotate" | "bounce" | "pulse" | "ping";
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  size = 24,
  color,
  animation,
  tooltip,
  children,
  ...others
}) => {
  function getWrapperIcon() {
    return (
      <div
        className={classNames("flex items-center justify-center", {
          "animate-spin": animation === "rotate",
          "animate-bounce": animation === "bounce",
          "animate-pulse": animation === "pulse",
          "animate-ping": animation === "ping",
        })}
        style={{
          width: size,
          height: size,
          color: color,
        }}
      >
        {children}
      </div>
    );
  }

  return tooltip ? (
    <ToolTip tooltip={tooltip} {...others}>
      {getWrapperIcon()}
    </ToolTip>
  ) : (
    getWrapperIcon()
  );
};

export default IconWrapper;
