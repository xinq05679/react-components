import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";
import IconWrapper from "./IconWrapper";
import { IconProps } from "../../metadata/IconProps";

export const QuestionIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#000",
  fill = false,
  ...others
}) => {
  return (
    <IconWrapper size={size} color={color} {...others}>
      {fill ? (
        <BsQuestionCircleFill size={size} />
      ) : (
        <BsQuestionCircle size={size} />
      )}
    </IconWrapper>
  );
};

export default QuestionIcon;
