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
    <IconWrapper size={size} color={color} {...others}>
      {fill ? (
        <BsExclamationCircleFill size={size} />
      ) : (
        <BsExclamationCircle size={size} />
      )}
    </IconWrapper>
  );
};

export default WarningIcon;
