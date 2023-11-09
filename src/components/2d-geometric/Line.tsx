import classNames from "classnames";
import { Margin, getCSSMargin } from "../../metadata/Margin";

export interface LineProps {
  direction?: "vertical" | "horizontal";
  thickness?: number;
  length?: number;
  color?: string;
  margin?: Margin;
}

export const Line: React.FC<LineProps> = ({
  direction = "vertical",
  length,
  thickness = 1,
  color = "#d1d5db",
  margin = direction === "vertical"
    ? { top: "auto", bottom: "auto", left: 1, right: 1 }
    : { top: 1, bottom: 1, left: "auto", right: "auto" },
}) => {
  return (
    <div
      style={{
        width: direction === "vertical" ? thickness : length || "auto",
        height: direction === "horizontal" ? thickness : length || "auto",
        backgroundColor: color,
        margin: getCSSMargin(margin),
        alignSelf: "stretch",
      }}
    ></div>
  );
};

export default Line;
