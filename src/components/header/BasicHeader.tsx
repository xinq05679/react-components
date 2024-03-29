import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";

export interface BasicHeaderProps {
  title?: React.ReactNode;
  icon?: any;
  containerStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  titleStyle?: ComponentStyleMerging;
}

export const BasicHeader: React.FC<BasicHeaderProps> = ({
  title,
  icon,
  iconStyle,
  containerStyle,
  titleStyle,
}) => {
  const _containerStyle = MergeComponentStyle(
    {
      css: "flex items-center gap-3 justify-center w-[100%] h-[100%] bg-[#0e6eb8]",
    },
    containerStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "shrink-0",
    },
    iconStyle
  );

  const _titleStyle = MergeComponentStyle(
    {
      css: "text-4xl text-[#fff] font-bold",
    },
    titleStyle
  );

  return (
    <div className={_containerStyle.css} style={_containerStyle.style}>
      <div className={_iconStyle.css} style={_iconStyle.style}>
        <img src={icon} alt="header icon" />
      </div>
      <div className={_titleStyle.css} style={_titleStyle.style}>
        {title}
      </div>
    </div>
  );
};

export default BasicHeader;
