import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicProgressBarProps {
  progressbarOuterStyle?: ComponentStyleMerging;
  progressbarInnerStyle?: ComponentStyleMerging;
  textStyle?: ComponentStyleMerging;
  value?: number;
}

export const BasicProgressBar: React.FC<BasicProgressBarProps> = ({
  progressbarOuterStyle,
  progressbarInnerStyle,
  textStyle,
  value = 45,
}) => {
  const _progressbarOuterStyle = MergeComponentStyle(
    {
      css: classNames("bg-[#e9ecef] h-[25px] relative rounded-[5px]"),
    },
    progressbarOuterStyle
  );

  const _progressbarInnerStyle = MergeComponentStyle(
    {
      css: classNames(
        "absolute rounded-[5px]",
        "bg-[#28a745] bg-[length:1rem_1rem]",
        "h-[100%]",
        "bg-strip-progressbar-gradient-45",
        "animate-strip-progressbar"
      ),
      style: {
        width: `${value}%`,
      },
    },
    progressbarInnerStyle
  );

  const _textStyle = MergeComponentStyle(
    {
      css: classNames(
        "flex justify-center items-center absolute w-[100%] h-[100%]",
        "text-[#000] text-[18px]"
      ),
    },
    textStyle
  );

  return (
    <div
      className={_progressbarOuterStyle.css}
      style={_progressbarOuterStyle.style}
    >
      <div
        className={_progressbarInnerStyle.css}
        style={_progressbarInnerStyle.style}
      ></div>
      <div className={_textStyle.css} style={_textStyle.style}>
        {`${value} %`}
      </div>
    </div>
  );
};

export default BasicProgressBar;
