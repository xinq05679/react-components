import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";

export interface BasicSpinProps {
  svgStyle?: ComponentStyleMerging;
  circleStyle?: ComponentStyleMerging;
  arcStyle?: ComponentStyleMerging;
}

export const BasicSpin: React.FC<BasicSpinProps> = ({
  svgStyle,
  circleStyle,
  arcStyle,
}) => {
  const _svgStyle = MergeComponentStyle(
    {
      css: "animate-spin stroke-[3px] ",
    },
    svgStyle
  );

  const _circleStyle = MergeComponentStyle(
    {
      css: "stroke-[#f3f3f3]",
    },
    circleStyle
  );

  const _arcStyle = MergeComponentStyle(
    {
      css: "stroke-[#28a745]",
    },
    arcStyle
  );

  return (
    <svg className={_svgStyle.css} style={_svgStyle.style} viewBox="0 0 32 32">
      <circle
        className={_circleStyle.css}
        style={_circleStyle.style}
        cx="16"
        cy="16"
        r="12"
        fill="none"
      />
      <path
        className={_arcStyle.css}
        style={_arcStyle.style}
        d="M 4 16 A 12 12, 0 0 1 16 4"
        fill="none"
      />
    </svg>
  );
};

export default BasicSpin;
