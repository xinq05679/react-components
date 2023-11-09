import { BsExclamationCircleFill, BsExclamationCircle } from "react-icons/bs";
import IconWrapper from "./IconWrapper";
import { IconProps } from "../../metadata/IconProps";

export const WarningIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#facc15",
  fill = false,
  ...others
}) => {
  return (
    <IconWrapper size={size} {...others}>
      {fill ? (
        <BsExclamationCircleFill size={size} color={color} />
      ) : (
        <BsExclamationCircle size={size} color={color} />
      )}
    </IconWrapper>
  );
};

export default WarningIcon;
