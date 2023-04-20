import QueryIcon from "../../resources/image/query.png";
import { MdOutlineError } from "react-icons/md";
import BasicModal from "../modal/BasicModal";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { QueryDialogType } from "../../metadata/QueryDialogType";

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
  informationStyle?: ComponentStyleMerging;
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
    informationStyle,
    closeButtonStyle,
    onCloseButtonClicked,
    reverseFooter,
  } = props;

  const _modalStyle = MergeComponentStyle({}, modalStyle);

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("h-[250px] w-[600px]", {
        "h-[480px]": information,
      }),
    },
    containerStyle
  );

  const _headerStyle = MergeComponentStyle({}, headerStyle);

  const _bodyStyle = MergeComponentStyle(
    {
      css: classNames("flex items-center gap-[25px]", "ml-[5%]"),
    },
    bodyStyle
  );

  const _contentStyle = MergeComponentStyle(
    {
      css: classNames("grow"),
    },
    contentStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: classNames(
        "h-[128px] w-[128px]",
        "text-[128px] text-[#f00]",
        "shrink-0 grow-0"
      ),
    },
    iconStyle
  );

  const _footerStyle = MergeComponentStyle(
    {
      css: classNames("flex flex-col", "px-[20px] py-[10px]", {
        "h-[250px]": information,
      }),
    },
    footerStyle
  );

  const _buttonStyle = MergeComponentStyle(
    {
      css: classNames("grow-0 self-end"),
    },
    buttonStyle
  );

  const _informationStyle = MergeComponentStyle(
    {
      css: classNames(
        "grow",
        "h-1 overflow-x-auto",

        "bg-[#eee]",
        "shadow-inner"
      ),
    },
    informationStyle
  );

  const _closeButtonStyle = MergeComponentStyle({}, closeButtonStyle);

  const renderIcon = () => {
    if (icon) return icon;

    switch (queryDialogType) {
      case QueryDialogType.Error:
        return (
          <MdOutlineError className={_iconStyle.css} style={_iconStyle.style} />
        );
      case QueryDialogType.Info:
      case QueryDialogType.Query:
      case QueryDialogType.Warning:
        return (
          <img
            src={QueryIcon}
            alt="query icon"
            className={_iconStyle.css}
            style={_iconStyle.style}
          />
        );
    }
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
    <>
      <BasicModal
        header={title}
        body={
          <>
            {/* ICON */}
            {renderIcon()}
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
    </>
  );
};

export default BasicQueryDialog;
