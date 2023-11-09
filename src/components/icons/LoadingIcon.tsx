import { RxReload } from "react-icons/rx";
import IconWrapper from "./IconWrapper";
import { IconProps } from "../../metadata/IconProps";

export const LoadingIcon: React.FC<Omit<IconProps, "fill">> = ({
  size = 24,
  color = "#84cc16",
  animation = "rotate",
  ...others
}) => {
  return (
    <IconWrapper size={size} animation={animation} {...others}>
      <RxReload size={size} color={color} />
    </IconWrapper>
  );
};

export default LoadingIcon;
