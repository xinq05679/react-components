import BasicModal from "../modal/BasicModal";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicProgressDialogProps {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  prgoressbar?: React.ReactNode;
  buttons?: React.ReactNode;
  information?: React.ReactNode;
  showCloseButton?: boolean;
  modalStyle?: ComponentStyleMerging;
  containerStyle?: ComponentStyleMerging;
  bodyStyle?: ComponentStyleMerging;
  contentStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  progressbarStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  footerStyle?: ComponentStyleMerging;
  buttonStyle?: ComponentStyleMerging;
  informationStyle?: ComponentStyleMerging;
  closeButtonStyle?: ComponentStyleMerging;
  onCloseButtonClicked?: () => void;
  reverseFooter?: boolean;
}

export function BasicProgressDialog(props: BasicProgressDialogProps) {
  const {
    title,
    icon,
    content,
    prgoressbar,
    buttons,
    information,
    showCloseButton,
    modalStyle,
    containerStyle,
    bodyStyle,
    contentStyle,
    iconStyle,
    progressbarStyle,
    headerStyle,
    footerStyle,
    buttonStyle,
    informationStyle,
    closeButtonStyle,
    onCloseButtonClicked,
    reverseFooter,
  } = props;

  const _modalStyle = MergeComponentStyle({ css: "group" }, modalStyle);

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames(
        "h-[250px] w-[600px]",
        "group-[&[data-progressbar='1']]:h-[300px]",
        "group-[&[data-information='1']]:h-[450px]",
        "group-[&[data-information='1'][data-progressbar='1']]:h-[550px]"
      ),
    },
    containerStyle
  );

  const _headerStyle = MergeComponentStyle({}, headerStyle);

  const _bodyStyle = MergeComponentStyle(
    {
      css: classNames("flex items-center"),
    },
    bodyStyle
  );

  const _contentStyle = MergeComponentStyle(
    {
      css: classNames("grow", "flex items-center", "h-[100%]"),
    },
    contentStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: classNames("h-[128px] w-[128px]", "shrink-0 grow-0", "mx-[10px]"),
    },
    iconStyle
  );

  const _footerStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex flex-col",
        "p-[20px]",
        "group-[&[data-progressbar='1']]:h-[100px]",
        "group-[&[data-information='1']]:h-[250px]",
        "group-[&[data-information='1'][data-progressbar='1']]:h-[350px]"
      ),
    },
    footerStyle
  );

  const _progressbarStyle = MergeComponentStyle(
    {
      css: classNames("grow-0 shrink-0"),
    },
    progressbarStyle
  );

  const _buttonStyle = MergeComponentStyle(
    {
      css: classNames("grow-0  shrink-0 self-end"),
    },
    buttonStyle
  );

  const _informationStyle = MergeComponentStyle(
    {
      css: classNames("grow", "h-1 overflow-auto", "bg-[#eee]", "shadow-inner"),
    },
    informationStyle
  );

  const _closeButtonStyle = MergeComponentStyle({}, closeButtonStyle);

  const renderFooter = () => {
    // If both buttons and inforamtion are empty, return null.
    if (!buttons && !information) return null;

    if (reverseFooter) {
      return (
        <>
          {renderProgressbar()}
          {renderButton()}
          {renderInformation()}
        </>
      );
    } else {
      return (
        <>
          {renderProgressbar()}
          {renderInformation()}
          {renderButton()}
        </>
      );
    }
  };

  const renderProgressbar = () => {
    if (!prgoressbar) return null;

    return (
      <div className={_progressbarStyle?.css} style={_progressbarStyle?.style}>
        {prgoressbar}
      </div>
    );
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
    if (typeof information === "string") {
      return (
        <pre className={_informationStyle.css} style={_informationStyle.style}>
          {information}
        </pre>
      );
    } else {
      return (
        <div className={_informationStyle.css} style={_informationStyle.style}>
          {information}
        </div>
      );
    }
  };

  return (
    <BasicModal
      data-information={information ? 1 : 0}
      data-progressbar={prgoressbar ? 1 : 0}
      header={title}
      body={
        <>
          {/* ICON */}
          {icon && (
            <div className={_iconStyle?.css} style={_iconStyle?.style}>
              {icon}
            </div>
          )}

          {/* CONTENT */}
          <div className={_contentStyle?.css} style={_contentStyle?.style}>
            {content}
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
  );
}

export default BasicProgressDialog;
