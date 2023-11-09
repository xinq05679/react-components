import { IconWrapperProps } from "../components/icons/IconWrapper";

export interface IconProps extends Omit<IconWrapperProps, "children"> {
  color?: string;
  fill?: boolean;
}
