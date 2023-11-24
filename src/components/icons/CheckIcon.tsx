import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import IconWrapper from "./IconWrapper";
import { IconProps } from "../../metadata/IconProps";

export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#84cc16",
  fill = false,
  ...others
}) => {
  return (
    <IconWrapper size={size} color={color} {...others}>
      {fill ? <BsCheckCircleFill size={size} /> : <BsCheckCircle size={size} />}
    </IconWrapper>
  );
};

export default CheckIcon;
