import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicPortal from "../portal/BasicPortal";

export interface BasicModalProps {
  Header?: React.ReactNode;
  Content?: React.ReactNode;
  Footer?: React.ReactNode;
  showCloseButton?: boolean;
  modalStyle?: ComponentStyleMerging;
  containerStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  contentStyle?: ComponentStyleMerging;
  footerStyle?: ComponentStyleMerging;
  closeButtonStyle?: ComponentStyleMerging;
  onCloseButtonClicked?: () => void;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  Header,
  Content,
  Footer,
  showCloseButton = true,
  modalStyle,
  containerStyle,
  headerStyle,
  contentStyle,
  footerStyle,
  closeButtonStyle,
  onCloseButtonClicked,
}) => {
  const _modalStyle = MergeComponentStyle(
    {
      css: classNames("flex justify-center items-center", "fixed inset-0"),
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
        "border-[2px] border-[#ccc] rounded"
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

  const _contentStyle = MergeComponentStyle(
    {
      css: classNames("grow"),
    },
    contentStyle
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
      <div className={_modalStyle.css} style={_modalStyle.style}>
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
          {Header && (
            <div className={_headerStyle.css} style={_headerStyle.style}>
              {Header}
            </div>
          )}

          {/* CONTENT */}
          <div className={_contentStyle.css} style={_contentStyle.style}>
            {Content}
          </div>

          {/* FOOTER */}
          {Footer && (
            <div className={_footerStyle.css} style={_footerStyle.style}>
              {Footer}
            </div>
          )}
        </div>
      </div>
    </BasicPortal>
  );
};

export default BasicModal;
