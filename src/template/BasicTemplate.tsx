import { ComponentStyleMerging } from "../metadata/ComponentStyle";
import { MergeComponentStyle } from "../utility/componentUtility";

interface BasicTemplateProps {
  Header?: React.ReactNode;
  ToolBar?: React.ReactNode;
  SideBar?: React.ReactNode;
  ContentPage?: React.ReactNode;
  Footer?: React.ReactNode;
  headerStyle?: ComponentStyleMerging;
  toolbarStyle?: ComponentStyleMerging;
  sidebarStyle?: ComponentStyleMerging;
  contentPageStyle?: ComponentStyleMerging;
  footerStyle?: ComponentStyleMerging;
}

const BasicTemplate: React.FC<BasicTemplateProps> = ({
  Header,
  ToolBar,
  SideBar,
  ContentPage,
  Footer,
  headerStyle,
  toolbarStyle,
  sidebarStyle,
  contentPageStyle,
  footerStyle,
}) => {
  const _headerStyle = MergeComponentStyle(
    {
      css: "grow-0 shrink-0 h-24",
    },
    headerStyle
  );

  const _toolbarStyle = MergeComponentStyle(
    {
      css: "grow-0 shrink-0 w-12",
    },
    toolbarStyle
  );

  const _sidebarStyle = MergeComponentStyle(
    {
      css: "grow-0 shrink-0 w-1/4",
    },
    sidebarStyle
  );

  const _contentPageStyle = MergeComponentStyle(
    {
      css: "grow shrink-0",
    },
    contentPageStyle
  );

  const _footerStyle = MergeComponentStyle(
    {
      css: "grow-0 shrink-0 h-8",
    },
    footerStyle
  );

  return (
    <>
      <div className="flex flex-col h-screen">
        {Header && (
          <div className={_headerStyle.css} style={_headerStyle.style}>
            {Header}
          </div>
        )}

        <div className="flex grow shrink-0">
          {ToolBar && (
            <div className={_toolbarStyle.css} style={_toolbarStyle.style}>
              {ToolBar}
            </div>
          )}

          {SideBar && (
            <div className={_sidebarStyle.css} style={_sidebarStyle.style}>
              {SideBar}
            </div>
          )}

          <div
            className={_contentPageStyle.css}
            style={_contentPageStyle.style}
          >
            {ContentPage}
          </div>
        </div>

        {Footer && (
          <div className={_footerStyle.css} style={_footerStyle.style}>
            {Footer}
          </div>
        )}
      </div>
    </>
  );
};

export default BasicTemplate;
