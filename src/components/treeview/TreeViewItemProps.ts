import { Point } from "../../metadata/Point";

export interface TreeViewItemProps<T> {
  id: string;
  icon?: any;
  name?: string;
  children?: T[];
  isSelected?: boolean;
  isExpanded?: boolean;
  isHovered?: boolean;
  onClicked?: () => void;
  onHovered?: () => void;
  onUnhovered?: () => void;
  onContextMenuClicked?: (pos: Point) => void;
}
