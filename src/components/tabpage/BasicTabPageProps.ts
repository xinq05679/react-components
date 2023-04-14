import { BasicTabProps } from "./BasicTabProps";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { Point } from "../../metadata/Point";

export interface BasicTabPageProps<T extends BasicTabProps> {
  tabs: T[];
  Tab?: React.FC<T>;
  onTabClicked?: (params: {
    event: React.MouseEvent<HTMLDivElement>;
    id: string;
  }) => void;
  onTabClosed?: (parms: {
    event: React.MouseEvent<HTMLButtonElement>;
    id: string;
  }) => void;
  onTabContextMenuClicked?: (params: {
    event: React.MouseEvent<HTMLDivElement>;
    id: string;
  }) => void;
  containerStyle?: ComponentStyleMerging;
  tabDivStyle?: ComponentStyleMerging;
  tabPageDivStyle?: ComponentStyleMerging;
}
