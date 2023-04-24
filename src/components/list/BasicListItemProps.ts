import { Point } from "../../metadata/Point";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import React from "react";

export interface BasicListItemProps {
  id: string;
  icon?: any;
  text?: React.ReactNode;
  isSelected?: boolean;
  unselectable?: boolean;
  onClicked?: () => void;
  onContextMenuClicked?: (pos: Point) => void;
  listStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
}
