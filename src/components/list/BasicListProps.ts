import { BasicListItemProps } from "./BasicListItemProps";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { Point } from "../../metadata/Point";

export interface BasicListProps<T extends BasicListItemProps> {
  listItems: T[];
  onClicked?: (id: string) => void;
  onContextMenuClicked?: (id: string, pos: Point) => void;
  ListItem?: React.FC<T>;
  containerStyle?: ComponentStyleMerging;
}
