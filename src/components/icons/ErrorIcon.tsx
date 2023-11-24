import { BsXCircleFill, BsXCircle } from "react-icons/bs";
import IconWrapper from "./IconWrapper";
import { IconProps } from "../../metadata/IconProps";

export const ErrorIcon: React.FC<IconProps> = ({
  size = 24,
  fill = false,
  color = "#f87171",
  ...others
}) => {
  return (
    <IconWrapper size={size} color={color} {...others}>
      {fill ? <BsXCircleFill size={size} /> : <BsXCircle size={size} />}
    </IconWrapper>
  );
};

export default ErrorIcon;
