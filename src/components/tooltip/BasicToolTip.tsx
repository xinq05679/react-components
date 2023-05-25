import classNames from "classnames";
import { useState, useRef, forwardRef, createRef } from "react";
import ReactDOM from "react-dom";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicPortal from "../portal/BasicPortal";

export type ToolTipPosition =
  | "TL"
  | "TC"
  | "TR"
  | "RT"
  | "RC"
  | "RB"
  | "BL"
  | "BC"
  | "BR"
  | "LT"
  | "LC"
  | "LB";

export interface BasicToolTipProps {
  children: React.ReactElement;
  text?: string;
  delayTimeOpen?: number;
  tooltipStyle?: ComponentStyleMerging;
  position?: ToolTipPosition;
}

export const BasicToolTip: React.FC<BasicToolTipProps> = ({
  children,
  text = "",
  delayTimeOpen = 0,
  tooltipStyle,
  position = "BC",
}) => {
  const [visible, setVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  // const divRef = createRef();
  const tooltipRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (visible) setVisible(false);
  };

  const handleMouseEnter = () => {
    reset();
    setVisible(true);

    timeoutRef.current = setTimeout(() => {
      if (!divRef.current || !tooltipRef.current) return;

      const divLeftTopPos = [
        divRef.current.getBoundingClientRect().left,
        divRef.current.getBoundingClientRect().top,
      ];

      const divCenterPos = [
        divLeftTopPos[0] + divRef.current.clientWidth / 2,
        divLeftTopPos[1] + divRef.current.clientHeight / 2,
      ];

      const divRightBottomPos = [
        divLeftTopPos[0] + divRef.current.clientWidth,
        divLeftTopPos[1] + divRef.current.clientHeight,
      ];

      switch (position) {
        case "BL":
        case "BC":
        case "BR":
          tooltipRef.current.style.top = divRightBottomPos[1] + "px";
          if (position === "BL") {
            tooltipRef.current.style.left = divLeftTopPos[0] + "px";
          } else if (position === "BC") {
            tooltipRef.current.style.left = divCenterPos[0] + "px";
          } else {
            tooltipRef.current.style.left = divRightBottomPos[0] + "px";
          }
          break;
        case "TL":
        case "TC":
        case "TR":
          tooltipRef.current.style.top =
            divLeftTopPos[1] - tooltipRef.current.clientHeight + "px";
          if (position === "TL") {
            tooltipRef.current.style.left = divLeftTopPos[0] + "px";
          } else if (position === "TC") {
            tooltipRef.current.style.left = divCenterPos[0] + "px";
          } else {
            tooltipRef.current.style.left = divRightBottomPos[0] + "px";
          }
          break;
        case "LT":
        case "LC":
        case "LB":
          tooltipRef.current.style.left =
            divLeftTopPos[0] - tooltipRef.current.clientWidth + "px";
          if (position === "LT") {
            tooltipRef.current.style.top = divLeftTopPos[1] + "px";
          } else if (position === "LC") {
            tooltipRef.current.style.top = divCenterPos[1] + "px";
          } else {
            tooltipRef.current.style.top = divRightBottomPos[1] + "px";
          }
          break;
        case "RT":
        case "RC":
        case "RB":
          tooltipRef.current.style.left = divRightBottomPos[0] + "px";
          if (position === "RT") {
            tooltipRef.current.style.top = divLeftTopPos[1] + "px";
          } else if (position === "RC") {
            tooltipRef.current.style.top = divCenterPos[1] + "px";
          } else {
            tooltipRef.current.style.top = divRightBottomPos[1] + "px";
          }
          break;
      }
    }, delayTimeOpen);
  };

  const handleMouseLeave = reset;

  const _tooltipStyle = MergeComponentStyle(
    {
      css: classNames(
        "px-[8px] py-[2px]",
        "bg-[#ff0] text-[#888]",
        "absolute",
        "rounded",
        "whitespace-nowrap"
      ),
    },
    tooltipStyle
  );

  return (
    <>
      <children.type
        {...children.props}
        ref={divRef}
        onMouseEnter={() => {
          handleMouseEnter();
          children.props.onMouseEnter?.();
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          children.props.onMouseLeave?.();
        }}
      />

      {text && visible && (
        <BasicPortal portalId="tooltip-portal">
          <span
            ref={tooltipRef}
            className={_tooltipStyle.css}
            style={_tooltipStyle.style}
          >
            {text}
          </span>
        </BasicPortal>
      )}
    </>
  );
};

export default BasicToolTip;
