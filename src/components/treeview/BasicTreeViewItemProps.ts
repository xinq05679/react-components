import { Point } from "../../metadata/Point";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export interface BasicTreeViewItemProps {
  id: string;
  text?: React.ReactNode;
  unselectable?: boolean;
  isSelected?: boolean;
  isExpanded?: boolean;
  children?: BasicTreeViewItemProps[];
  arrow?: React.ReactNode;
  containerStyle?: ComponentStyleMerging;
  arrowStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
  onClicked?: (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    id: string;
  }) => void;
  onContextMenuClicked?: (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    id: string;
    pos: Point;
  }) => void;
}
