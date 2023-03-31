import {
  ComponentStyle,
  ComponentStyleMerging,
} from "../metadata/ComponentStyle";
import classNames from "classnames";
import { MergeComponentStyle } from "../utility/componentUtility";

interface BasicTemplateProps {
  Header?: React.ReactNode;
  ToolBar?: React.ReactNode;
  TreeView?: React.ReactNode;
  ContentPage?: React.ReactNode;
  headerStyle?: ComponentStyleMerging;
  toolbarStyle?: ComponentStyleMerging;
  treeViewStyle?: ComponentStyleMerging;
  contentPageStyle?: ComponentStyleMerging;
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

  const _treeViewStyle = MergeComponentStyle(
    {
      css: "grow-0 shrink-0 w-1/4",
    },
    treeViewStyle
  );

  const _contentPageStyle = MergeComponentStyle(
    {
      css: "grow shrink-0",
    },
    contentPageStyle
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

          {TreeView && (
            <div className={_treeViewStyle.css} style={_treeViewStyle.style}>
              {TreeView}
            </div>
          )}

          <div
            className={_contentPageStyle.css}
            style={_contentPageStyle.style}
          >
            {ContentPage}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicTemplate;
