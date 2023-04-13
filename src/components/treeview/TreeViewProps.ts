import { TreeViewItemProps } from "./TreeViewItemProps";
import { Point } from "../../metadata/Point";

export interface TreeViewProps<T extends TreeViewItemProps<T>> {
  roots: T[];
  onClicked?: (id: string) => void;
  onHovered?: (id: string) => void;
  onUnhovered?: (id: string) => void;
  onContextMenuClicked?: (id: string, pos: Point) => void;
  TreeViewItem: React.FC<T>;
}
