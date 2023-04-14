import BasicTab from "./BasicTab";
import { BasicTabProps } from "./BasicTabProps";
import { BasicTabPageProps } from "./BasicTabPageProps";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { Fragment } from "react";

export function BasicTabPage<T extends BasicTabProps>(
  props: BasicTabPageProps<T>
): React.ReactElement<BasicTabPageProps<T>> {
  const {
    tabs,
    Tab,
    onTabClicked,
    onTabClosed,
    onTabContextMenuClicked,
    containerStyle,
    tabDivStyle,
    tabPageDivStyle,
  } = props;

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
      css: "flex flex-col grow h-[100%]",
    },
    tabPageDivStyle
  );

  return (
    <div className={_containerStyle.css} style={_containerStyle.style}>
      <div className={_tabDivStyle.css} style={_tabDivStyle.style}>
        {tabs.map((tab) => {
          const TabFC = Tab || BasicTab;
          return (
            <Fragment key={`${tab.id}`}>
              <TabFC
                onClicked={(params) => onTabClicked?.(params)}
                onClosed={(params) => onTabClosed?.(params)}
                onContextMenuClicked={(params) =>
                  onTabContextMenuClicked?.(params)
                }
                {...tab}
              />
            </Fragment>
          );
        })}
      </div>
      <div className={_tabPageDivStyle.css} style={_tabPageDivStyle.style}>
        {(() => {
          return tabs.find((tab) => tab.isSelected)?.page;
        })()}
      </div>
    </div>
  );
}

export default BasicTabPage;
