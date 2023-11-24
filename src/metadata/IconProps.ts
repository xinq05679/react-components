import { IconWrapperProps } from "../components/icons/IconWrapper";

export interface IconProps extends Omit<IconWrapperProps, "children"> {
  fill?: boolean;
}
