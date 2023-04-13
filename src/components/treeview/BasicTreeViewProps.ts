import { BasicTreeViewItemProps } from "./BasicTreeViewItemProps";
import { Point } from "../../metadata/Point";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export interface BasicTreeViewProps<T extends BasicTreeViewItemProps> {
  roots: T[];
  TreeViewItemFC?: React.FC<T>;
  onClicked?: (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    id: string;
  }) => void;
  onContextMenuClicked?: (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    id: string;
    pos: Point;
  }) => void;
  containerStyle?: ComponentStyleMerging;
}
