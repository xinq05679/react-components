import { Point } from "../../metadata/Point";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export interface BasicTabProps {
  id: string;
  icon?: any;
  text?: string;
  page?: React.ReactNode;
  isSelected?: boolean;
  isModified?: boolean;
  onClicked?: () => void;
  onClosed?: () => void;
  onContextMenuClicked?: (pos: Point) => void;
  containerStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
  crossStyle?: ComponentStyleMerging;
}
