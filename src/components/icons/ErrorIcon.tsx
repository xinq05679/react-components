import { BsXCircleFill, BsXCircle } from "react-icons/bs";
import IconWrapper from "./IconWrapper";
import { IconProps } from "../../metadata/IconProps";

export const ErrorIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#f87171",
  fill = false,
  ...others
}) => {
  return (
    <IconWrapper size={size} {...others}>
      {fill ? (
        <BsXCircleFill size={size} color={color} />
      ) : (
        <BsXCircle size={size} color={color} />
      )}
    </IconWrapper>
  );
};

export default ErrorIcon;
