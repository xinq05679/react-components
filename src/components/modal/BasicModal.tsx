import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicPortal from "../portal/BasicPortal";

export interface BasicModalProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  modalStyle?: ComponentStyleMerging;
  containerStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  bodyStyle?: ComponentStyleMerging;
  footerStyle?: ComponentStyleMerging;
  closeButtonStyle?: ComponentStyleMerging;
  onCloseButtonClicked?: () => void;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  header,
  body,
  footer,
  showCloseButton,
  modalStyle,
  containerStyle,
  headerStyle,
  bodyStyle,
  footerStyle,
  closeButtonStyle,
  onCloseButtonClicked,
  ...others
}) => {
  const _modalStyle = MergeComponentStyle(
    {
      css: classNames("flex justify-center items-center", "fixed inset-[0px]"),
    },
    modalStyle
  );

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex flex-col",
        "h-[50%] w-[50%]",
        "bg-[#fff]",
        "relative",
        "border-[1px] border-[#888] rounded-b-md"
      ),
    },
    containerStyle
  );

  const _headerStyle = MergeComponentStyle(
    {
      css: classNames(
        "h-[32px]",
        "px-[5px]",
        "flex items-center shrink-0 grow-0",
        "bg-[#0e6eb8]",
        "text-[#fff] font-bold"
      ),
    },
    headerStyle
  );

  const _bodyStyle = MergeComponentStyle(
    {
      css: classNames("grow"),
    },
    bodyStyle
  );

  const _footerStyle = MergeComponentStyle(
    {
      css: classNames(
        "h-[64px]",
        "flex justify-center gap-[10px] shrink-0 grow-0"
      ),
    },
    footerStyle
  );

  const _closeButtonStyle = MergeComponentStyle(
    {
      css: classNames(
        "absolute",
        "right-[10px]",
        "text-[#fff] text-[18px] font-normal",
        "hover:font-bold",
        "active:text-[#ccc]"
      ),
    },
    closeButtonStyle
  );

  return (
    <BasicPortal portalId="modal-portal">
      <div {...others} className={_modalStyle.css} style={_modalStyle.style}>
        <div className={_containerStyle.css} style={_containerStyle.style}>
          {/* CLOSE BUTTON */}
          {showCloseButton && (
            <button
              className={_closeButtonStyle.css}
              style={_closeButtonStyle.style}
              onClick={onCloseButtonClicked}
            >
              &#10005;
            </button>
          )}

          {/* HEADER */}
          {header && (
            <div className={_headerStyle.css} style={_headerStyle.style}>
              {header}
            </div>
          )}

          {/* BODY */}
          <div className={_bodyStyle.css} style={_bodyStyle.style}>
            {body}
          </div>

          {/* FOOTER */}
          {footer && (
            <div className={_footerStyle.css} style={_footerStyle.style}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </BasicPortal>
  );
};

export default BasicModal;
