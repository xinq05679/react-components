import { SVGProps } from "../../metadata/SVGProps";
import IconWrapper from "../icons/IconWrapper";

export interface SpinSVGProps extends SVGProps {
  size?: number;
  arcColor?: string;
  circleColor?: string;
  storkWidth?: number;
}

export const SpinSVG: React.FC<SpinSVGProps> = ({
  size = 24,
  arcColor = "#28a745",
  circleColor = "#f3f3f3",
  storkWidth = 3,
  ...others
}) => {
  return (
    <IconWrapper size={size} {...others}>
      <svg style={{ width: size, height: size }} viewBox={"0 0 32 32"}>
        {/* Circle */}
        <circle
          style={{ stroke: circleColor, strokeWidth: storkWidth }}
          cx="16"
          cy="16"
          r="12"
          fill="none"
        />
        {/* Arc */}
        <path
          style={{ stroke: arcColor, strokeWidth: storkWidth }}
          d="M 4 16 A 12 12, 0 0 1 16 4"
          fill="none"
        />
      </svg>
    </IconWrapper>
  );
};

export default SpinSVG;
