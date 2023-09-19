import classNames from "classnames";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import BasicPortal from "../portal/BasicPortal";
import { useRef, useState, useEffect } from "react";

type ToolTipPosition =
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

interface ToolTipProps {
  children: React.ReactElement;
  tooltip?: React.ReactNode;
  delayTimeOpen?: number;
  tooltipDivStyle?: ComponentStyleMerging;
  position?: ToolTipPosition;
}

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  tooltip,
  delayTimeOpen = 0,
  tooltipDivStyle,
  position = "BC",
}) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeId = setTimeout(() => {
      showToolTip();
    }, delayTimeOpen);
    return () => {
      clearTimeout(timeId);
    };
  }, [visible]);

  const _tooltipDivStyle = MergeComponentStyle(
    {
      css: classNames("absolute"),
    },
    tooltipDivStyle
  );

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
          <div ref={tooltipRef} className={classNames(_tooltipDivStyle.css)}>
            {tooltip}
          </div>
        </BasicPortal>
      )}
    </>
  );
};

export default ToolTip;
