import Hourglass from "../../resources/image/hourglass.gif";
import BasicDialog from "../BasicDialog";
import useProgressBarDialog from "./useProgressBarDialog";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicButton from "../../components/button/BasicButton";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import BasicProgressBar from "../../components/progressbar/BasicProgressBar";

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
    ProgressBar = BasicProgressBar,
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
          <ProgressBar value={progressValue} />
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
