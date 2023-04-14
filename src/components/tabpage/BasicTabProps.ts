import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export interface BasicTabProps {
  id: string;
  icon?: any;
  text?: string;
  page?: React.ReactNode;
  isSelected?: boolean;
  isModified?: boolean;
  onClicked?: (params: {
    event: React.MouseEvent<HTMLDivElement>;
    id: string;
  }) => void;
  onClosed?: (parms: {
    event: React.MouseEvent<HTMLButtonElement>;
    id: string;
  }) => void;
  onContextMenuClicked?: (params: {
    event: React.MouseEvent<HTMLDivElement>;
    id: string;
  }) => void;
  containerStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
  crossStyle?: ComponentStyleMerging;
}
