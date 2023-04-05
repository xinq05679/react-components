import { Point } from "../../metadata/Point";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export interface BasicListItemProps {
  id: string;
  icon?: any;
  text?: string;
  isSelected?: boolean;
  unselectable?: boolean;
  onClicked?: () => void;
  onContextMenuClicked?: (pos: Point) => void;
  listStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
}
