import Hourglass from "../../resources/image/hourglass.gif";
import BasicDialog from "../BasicDialog";
import useProgressBarDialog from "./useProgressBarDialog";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicButton from "../../components/button/BasicButton";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export const ProgressBarDialog: React.FC = () => {
  const { isOpen, settings } = useProgressBarDialog();
  const {
    title,
    content,
    icon,
    progressValue = 0,
    buttons,
    headerStyle,
    containerStyle,
    bodyStyle,
    contentStyle,
    iconStyle,
    progressInnerStyle,
    progressOuterStyle,
    progressValueStyle,
    buttonDivStyle,
  } = settings;

  const _containerStyle = MergeComponentStyle(
    {
      css: "h-80",
    },
    containerStyle
  );

  const _bodyStyle = MergeComponentStyle(
    {
      css: "h-32",
    },
    bodyStyle
  );

  const _iconStyle = MergeComponentStyle(
    {
      css: "h-32",
    },
    iconStyle
  );

  const footStyle: ComponentStyleMerging = {
    css: "flex flex-col w-[100%] gap-[20px] px-[10px]",
  };

  const _progressOuterStyle = MergeComponentStyle(
    {
      css: "rounded relative bg-gray-200 h-6 mx-3",
    },
    progressOuterStyle
  );

  const _progressInnerStyle = MergeComponentStyle(
    {
      css: "rounded absolute w-[100%] h-[100%] bg-green-500",
    },
    progressInnerStyle
  );

  const _progressValueStyle = MergeComponentStyle(
    {
      css: "absolute w-[100%] text-center text-[#fff] font-bold",
    },
    progressValueStyle
  );

  const _buttonDivStyle = MergeComponentStyle(
    {
      css: "flex shrink-0 w-[100%] justify-center gap-3",
    },
    buttonDivStyle
  );

  return (
    <BasicDialog
      Header={title}
      Content={content}
      Image={
        <img
          className={_iconStyle.css}
          style={_iconStyle.style}
          src={icon || Hourglass}
        ></img>
      }
      Footer={
        <>
          {/* Progress Bar  */}
          <div
            className={_progressOuterStyle.css}
            style={_progressOuterStyle.style}
          >
            <div
              className={_progressInnerStyle.css}
              style={
                _progressInnerStyle.style || { width: `${progressValue}%` }
              }
            ></div>
            <div
              className={_progressValueStyle.css}
              style={_progressValueStyle.style}
            >
              {progressValue}%
            </div>
          </div>
          {/* Buttons */}
          <div className={_buttonDivStyle.css} style={_buttonDivStyle.style}>
            {buttons && (
              <>
                {buttons.map((button, index) => {
                  return (
                    <BasicButton
                      key={index}
                      {...button}
                      customizedStyle={{ css: "h-[36px]" }}
                    />
                  );
                })}
              </>
            )}
          </div>
        </>
      }
      isOpen={isOpen}
      headerStyle={headerStyle}
      containerStyle={_containerStyle}
      bodyStyle={_bodyStyle}
      contentStyle={contentStyle}
      footerStyle={footStyle}
    />
  );
};

export default ProgressBarDialog;
