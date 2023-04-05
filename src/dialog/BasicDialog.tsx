import { ComponentStyleMerging } from "../metadata/ComponentStyle";
import { MergeComponentStyle } from "../utility/componentUtility";
import ReactDOM from "react-dom";

export interface BasicDialogProps {
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
  Content?: React.ReactNode;
  Image?: React.ReactNode;
  containerStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  bodyStyle?: ComponentStyleMerging;
  footerStyle?: ComponentStyleMerging;
  imageStyle?: ComponentStyleMerging;
  contentStyle?: ComponentStyleMerging;
  isOpen?: boolean;
}

const BasicDialog: React.FC<BasicDialogProps> = ({
  Header,
  Footer,
  Content,
  Image,
  containerStyle,
  bodyStyle,
  headerStyle,
  footerStyle,
  imageStyle,
  contentStyle,
  isOpen,
}) => {
  const _containerStyle = MergeComponentStyle(
    {
      css: "flex flex-col border bg-white self-center h-64 pb-4",
      style: {
        width: "520px",
      },
    },
    containerStyle
  );

  const _headerStyle = MergeComponentStyle(
    {
      css: "flex items-center justify-between h-8 p-2 bg-[#0e6eb8] text-[#fff]",
    },
    headerStyle
  );

  const _bodyStyle = MergeComponentStyle(
    {
      css: "flex shrink-0 grow h-36 items-center gap-8 p-4",
    },
    bodyStyle
  );

  const _imageStyle = MergeComponentStyle(
    {
      css: "shrink-0",
    },
    imageStyle
  );

  const _contentStyle = MergeComponentStyle(
    {
      css: "flex items-center h-full w-full font-bold text-gray-500",
    },
    contentStyle
  );

  const _footerStyle = MergeComponentStyle(
    {
      css: "flex shrink-0 w-full justify-center gap-3",
    },
    footerStyle
  );

  return ReactDOM.createPortal(
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center">
        {/* container */}
        <div className={_containerStyle.css} style={_containerStyle.style}>
          {/* header */}
          <div className={_headerStyle.css} style={_headerStyle.style}>
            {Header}
          </div>
          {/* body */}
          <div className={_bodyStyle.css} style={_bodyStyle.style}>
            {/* image */}
            {Image && (
              <div className={_imageStyle.css} style={_imageStyle.style}>
                {Image}
              </div>
            )}
            {/* content */}
            <div className={_contentStyle.css} style={_contentStyle.style}>
              {Content}
            </div>
          </div>
          {/* footer */}
          <div className={_footerStyle.css} style={_footerStyle.style}>
            {Footer}
          </div>
        </div>
      </div>
    ),
    (() => {
      const divId = "dialog-portal-div";
      let portal = document.querySelector(divId);
      if (portal === null) {
        portal = document.createElement(divId);
        portal.id = divId;
        document.querySelector("body")?.appendChild(portal);
      }
      return portal;
    })()
  );
};

export default BasicDialog;
