import { ComponentStyle } from "../metadata/ComponentStyle";
import classNames from "classnames";

interface BasicTemplateProps {
  Header?: React.ReactNode;
  ToolBar?: React.ReactNode;
  TreeView?: React.ReactNode;
  ContentPage?: React.ReactNode;
  headerStyle?: ComponentStyle;
  toolbarStyle?: ComponentStyle;
  treeViewStyle?: ComponentStyle;
  contentPageStyle?: ComponentStyle;
}

const BasicTemplate: React.FC<BasicTemplateProps> = ({
  Header,
  ToolBar,
  TreeView,
  ContentPage,
  headerStyle,
  toolbarStyle,
  treeViewStyle,
  contentPageStyle,
}) => {
  headerStyle = {
    css: classNames("grow-0 shrink-0 h-24", headerStyle?.css),
    style: headerStyle?.style,
  };
  console.log(headerStyle);

  toolbarStyle = {
    css: classNames("grow-0 shrink-0 w-12", toolbarStyle?.css),
    style: toolbarStyle?.style,
  };

  treeViewStyle = {
    css: classNames("grow-0 shrink-0 w-1/4", treeViewStyle?.css),
    style: treeViewStyle?.style,
  };

  contentPageStyle = {
    css: classNames("grow shrink-0", contentPageStyle?.css),
    style: contentPageStyle?.style,
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {Header && (
          <div className={headerStyle.css} style={headerStyle.style}>
            {Header}
          </div>
        )}

        <div className="flex grow shrink-0">
          {ToolBar && (
            <div className={toolbarStyle.css} style={toolbarStyle.style}>
              {ToolBar}
            </div>
          )}

          {TreeView && (
            <div className={treeViewStyle.css} style={treeViewStyle.style}>
              {TreeView}
            </div>
          )}

          <div className={contentPageStyle.css} style={contentPageStyle.style}>
            {ContentPage}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicTemplate;
