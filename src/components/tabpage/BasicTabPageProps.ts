import { BasicTabProps } from "./BasicTabProps";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { Point } from "../../metadata/Point";

export interface BasicTabPageProps<T extends BasicTabProps> {
  tabs: T[];
  Tab?: React.FC<T>;
  onTabClicked?: (tabProps: T) => void;
  onTabClosed?: (tabProps: T) => void;
  onTabContextMenuClicked?: (tabProps: T, pos: Point) => void;
  containerStyle?: ComponentStyleMerging;
  tabDivStyle?: ComponentStyleMerging;
  tabPageDivStyle?: ComponentStyleMerging;
}