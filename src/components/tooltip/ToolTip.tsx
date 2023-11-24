import classNames from "classnames";
import BasicPortal from "../portal/BasicPortal";
import { useRef, useState, useEffect } from "react";
import { Point } from "../../metadata/Point";

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

export interface ToolTipProps {
  children: React.ReactElement;
  tooltip?: React.ReactNode;
  tooltipDelayTimeOpen?: number;
  tooltipBackgroundColor?: string;
  tooltipFontColor?: string;
  tooltipPadding?: string;
  tooltipPosition?: ToolTipPosition;
  tooltipTrasform?: string;
  tooltipBorderRadius?: string;
  tooltipBorderWidth?: string;
  tooltipBorderColor?: string;
  tooltipBorderStyle?: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  tooltip,
  tooltipDelayTimeOpen = 0,
  tooltipBackgroundColor = "#ffffffef",
  tooltipBorderRadius,
  tooltipBorderWidth,
  tooltipBorderColor,
  tooltipBorderStyle,
  tooltipFontColor = "#00f",
  tooltipPadding = "5px",
  tooltipPosition = "BC",
  tooltipTrasform,
}) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      showToolTip();
    }, tooltipDelayTimeOpen);
    return () => {
      clearTimeout(timeId);
    };
  }, [visible]);

  function showToolTip() {
    if (!visible || !childrenRef.current || !tooltipRef.current) return;

    const divLeftTopPos = [
      childrenRef.current.getBoundingClientRect().left,
      childrenRef.current.getBoundingClientRect().top,
    ];

    const divCenterPos = [
      divLeftTopPos[0] + childrenRef.current.clientWidth / 2,
      divLeftTopPos[1] + childrenRef.current.clientHeight / 2,
    ];

    const divRightBottomPos = [
      divLeftTopPos[0] + childrenRef.current.clientWidth,
      divLeftTopPos[1] + childrenRef.current.clientHeight,
    ];

    switch (tooltipPosition) {
      case "BL":
      case "BC":
      case "BR":
        tooltipRef.current.style.top = divRightBottomPos[1] + "px";
        if (tooltipPosition === "BL") {
          tooltipRef.current.style.left = divLeftTopPos[0] + "px";
        } else if (tooltipPosition === "BC") {
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
        if (tooltipPosition === "TL") {
          tooltipRef.current.style.left = divLeftTopPos[0] + "px";
        } else if (tooltipPosition === "TC") {
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
        if (tooltipPosition === "LT") {
          tooltipRef.current.style.top = divLeftTopPos[1] + "px";
        } else if (tooltipPosition === "LC") {
          tooltipRef.current.style.top = divCenterPos[1] + "px";
        } else {
          tooltipRef.current.style.top = divRightBottomPos[1] + "px";
        }
        break;
      case "RT":
      case "RC":
      case "RB":
        tooltipRef.current.style.left = divRightBottomPos[0] + "px";
        if (tooltipPosition === "RT") {
          tooltipRef.current.style.top = divLeftTopPos[1] + "px";
        } else if (tooltipPosition === "RC") {
          tooltipRef.current.style.top = divCenterPos[1] + "px";
        } else {
          tooltipRef.current.style.top = divRightBottomPos[1] + "px";
        }
        break;
    }
  }

  function handleMouseEnter() {
    setVisible(true);
  }

  function handleMouseLeave() {
    setVisible(false);
  }

  return (
    <>
      <children.type
        {...children.props}
        ref={childrenRef}
        onMouseEnter={() => {
          handleMouseEnter();
          children.props.onMouseEnter?.();
        }}
        onMouseLeave={() => {
          handleMouseLeave();
          children.props.onMouseLeave?.();
        }}
      />
      {tooltip && visible && (
        <BasicPortal portalId="tooltip-portal">
          <div
            ref={tooltipRef}
            className={classNames("absolute")}
            style={{
              backgroundColor: tooltipBackgroundColor,
              color: tooltipFontColor,
              padding: tooltipPadding,
              transform: tooltipTrasform,
              borderRadius: tooltipBorderRadius,
              borderWidth: tooltipBorderWidth,
              borderBlockColor: tooltipBorderColor,
              borderStyle: tooltipBorderStyle,
            }}
          >
            {tooltip}
          </div>
        </BasicPortal>
      )}
    </>
  );
};

export default ToolTip;
