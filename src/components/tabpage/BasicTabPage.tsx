import BasicTab from "./BasicTab";
import { BasicTabProps } from "./BasicTab";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { Fragment } from "react";

export interface BasicTabPageProps<T extends BasicTabProps> {
  tabs: { [name: string]: T };
  Tab?: React.FC<T>;
  containerStyle?: ComponentStyleMerging;
  tabDivStyle?: ComponentStyleMerging;
  tabPageDivStyle?: ComponentStyleMerging;
}

export function BasicTabPage<T extends BasicTabProps>(
  props: BasicTabPageProps<T>
): React.ReactElement<BasicTabPageProps<T>> {
  const { tabs, Tab, containerStyle, tabDivStyle, tabPageDivStyle } = props;

  const _containerStyle = MergeComponentStyle(
    {
      css: "flex flex-col h-[100%] w-[100%]",
    },
    containerStyle
  );

  const _tabDivStyle = MergeComponentStyle(
    {
      css: "flex shrink-0",
    },
    tabDivStyle
  );

  const _tabPageDivStyle = MergeComponentStyle(
    {
      css: "flex flex-col grow h-[100%] border-t-[2px]",
    },
    tabPageDivStyle
  );

  return (
    <div className={_containerStyle.css} style={_containerStyle.style}>
      <div className={_tabDivStyle.css} style={_tabDivStyle.style}>
        {Object.entries(tabs).map(([key, tab]) => {
          const TabFC = Tab || BasicTab;
          return (
            <Fragment key={key}>
              <TabFC {...tab} />
            </Fragment>
          );
        })}
      </div>
      <div className={_tabPageDivStyle.css} style={_tabPageDivStyle.style}>
        {Object.values(tabs).find((tab) => tab.isSelected)?.page}
      </div>
    </div>
  );
}

export default BasicTabPage;
