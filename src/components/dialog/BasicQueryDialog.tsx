import QueryIcon from "../../resources/image/query.png";
import ErrorIcon from "../../resources/image/error.png";
import { MdOutlineError } from "react-icons/md";
import BasicModal from "../modal/BasicModal";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { QueryDialogType } from "../../metadata/QueryDialogType";
import { useEffect, useRef, useState } from "react";

export interface BasicQueryDialogProps {
  queryDialogType?: QueryDialogType;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  buttons?: React.ReactNode;
  information?: React.ReactNode;
  showCloseButton?: boolean;
  modalStyle?: ComponentStyleMerging;
  containerStyle?: ComponentStyleMerging;
  bodyStyle?: ComponentStyleMerging;
  contentStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  footerStyle?: ComponentStyleMerging;
  buttonStyle?: ComponentStyleMerging;
  outerInformationStyle?: ComponentStyleMerging;
  innerInformationStyle?: ComponentStyleMerging;
  closeButtonStyle?: ComponentStyleMerging;
  onCloseButtonClicked?: () => void;
  reverseFooter?: boolean;
}

export const BasicQueryDialog: React.FC<BasicQueryDialogProps> = (props) => {
  const {
    queryDialogType = QueryDialogType.Info,
    title,
    icon,
    content,
    buttons,
    information,
    showCloseButton,
    modalStyle,
    containerStyle,
    bodyStyle,
    iconStyle,
    contentStyle,
    headerStyle,
    footerStyle,
    buttonStyle,
    outerInformationStyle,
    innerInformationStyle,
    closeButtonStyle,
    onCloseButtonClicked,
    reverseFooter,
  } = props;

  const bodyDiv = useRef<HTMLDivElement>(null);
  const span = useRef<HTMLSpanElement>(null);
  const [bodyDivHeight, setBodyDivHeight] = useState(0);

  useEffect(() => {
    setBodyDivHeight(bodyDiv?.current?.clientHeight ?? 0);
  }, [bodyDiv]);

  const _modalStyle = MergeComponentStyle({ css: "group" }, modalStyle);

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames(
        "h-[250px] w-[600px]",
        "group-[&[data-information='1']]:h-[450px]"
      ),
    },
    containerStyle
  );

  const _headerStyle = MergeComponentStyle(
    {
      css: classNames({
        "bg-[#0e6eb8]": queryDialogType == QueryDialogType.Info,
        "bg-[#bb2d3b]": queryDialogType == QueryDialogType.Error,
        "bg-[#ffcd39]": queryDialogType == QueryDialogType.Warning,
      }),
    },
    headerStyle
  );

  const _bodyStyle = MergeComponentStyle(
    {
      css: classNames("flex items-center gap-[10px] grow", "pl-[20px]"),
    },
    bodyStyle
  );

  const _contentStyle = MergeComponentStyle(
    {
      css: classNames(
        "text-wrap break-words",
        "overflow-hidden overflow-y-auto",
        {
          "flex items-center":
            (span?.current?.clientHeight ?? 0) <=
            (bodyDiv.current?.clientHeight ?? 0),
        }
      ),
      style: {
        height: `${bodyDivHeight}px`,
      },
    },
    contentStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: classNames(
        "h-[96px] w-[96px]",
        "text-[96px] text-[#f00]",
        "shrink-0"
      ),
    },
    iconStyle
  );

  const _footerStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex flex-col",
        "p-[20px]",
        "group-[&[data-information='1']]:h-[250px]"
      ),
    },
    footerStyle
  );

  const _buttonStyle = MergeComponentStyle(
    {
      css: classNames("grow-0 self-end", "flex items-cetner gap-[10px]"),
    },
    buttonStyle
  );

  const _outerInformationStyle = MergeComponentStyle(
    {
      css: classNames("grow", "relative", "h-[100%]"),
    },
    outerInformationStyle
  );

  const _innerInformationStyle = MergeComponentStyle(
    {
      css: classNames(
        "absolute",
        "overflow-auto",
        "h-[100%] w-[100%]",
        "bg-[#eee]",
        "shadow-inner"
      ),
    },
    innerInformationStyle
  );

  const _closeButtonStyle = MergeComponentStyle({}, closeButtonStyle);

  const renderIcon = () => {
    if (icon)
      return (
        <div className={_iconStyle.css} style={_iconStyle.style}>
          {icon}
        </div>
      );

    let src = QueryIcon;

    switch (queryDialogType) {
      case QueryDialogType.Error:
        src = ErrorIcon;
        break;
    }

    return (
      <div className={_iconStyle.css} style={_iconStyle.style}>
        <img
          className={_iconStyle.css}
          style={_iconStyle.style}
          src={src}
          alt="query icon"
        />
      </div>
    );
  };

  const renderFooter = () => {
    // If both buttons and inforamtion are empty, return null.
    if (!buttons && !information) return null;

    if (reverseFooter) {
      return (
        <>
          {renderButton()}
          {renderInformation()}
        </>
      );
    } else {
      return (
        <>
          {renderInformation()}
          {renderButton()}
        </>
      );
    }
  };

  const renderButton = () => {
    if (!buttons) return null;
    return (
      <div className={_buttonStyle.css} style={_buttonStyle.style}>
        {buttons}
      </div>
    );
  };

  const renderInformation = () => {
    if (!information) return null;
    return (
      <div
        className={_outerInformationStyle.css}
        style={_outerInformationStyle.style}
      >
        <div
          className={_innerInformationStyle.css}
          style={_innerInformationStyle.style}
        >
          {information}
        </div>
      </div>
    );
  };

  return (
    <>
      <BasicModal
        data-information={information ? 1 : 0}
        header={title}
        body={
          <>
            <div ref={bodyDiv} className="flex items-center h-full w-full">
              {/* ICON */}
              {renderIcon()}
              {/* CONTENT */}
              <div className={_contentStyle.css} style={_contentStyle.style}>
                <span
                  ref={span}
                  style={{
                    margin: "auto 0",
                  }}
                >
                  {content}
                </span>
              </div>
            </div>
          </>
        }
        footer={renderFooter()}
        showCloseButton={showCloseButton}
        modalStyle={_modalStyle}
        containerStyle={_containerStyle}
        bodyStyle={_bodyStyle}
        headerStyle={_headerStyle}
        footerStyle={_footerStyle}
        closeButtonStyle={_closeButtonStyle}
        onCloseButtonClicked={onCloseButtonClicked}
      />
    </>
  );
};

export default BasicQueryDialog;
