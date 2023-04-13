import QueryIcon from "../../resources/image/query.png";
import BasicDialog from "../BasicDialog";
import { QueryDialogType } from "../../metadata/QueryDialogType";
import { MergeComponentStyle } from "../../utility/componentUtility";
import useQueryDialog from "./useQueryDialog";
import BasicButton from "../../components/button/BasicButton";
import { MdOutlineError } from "react-icons/md";

export const QueryDialog: React.FC = () => {
  const { isOpen, settings } = useQueryDialog();
  const {
    title,
    content,
    icon,
    buttons,
    type = QueryDialogType.Info,
    iconStyle,
    headerStyle,
    contentStyle,
    containerStyle,
    buttonDivStyle,
  } = settings;

  const _iconStyle = MergeComponentStyle(
    {
      css: "h-[20]",
    },
    iconStyle
  );

  const _headerStyle = MergeComponentStyle({}, headerStyle);

  const _buttonDivStyle = MergeComponentStyle({}, buttonDivStyle);

  const getImage = (): React.ReactNode => {
    let trgIcon = icon;

    if (!trgIcon) {
      switch (type) {
        case QueryDialogType.Error:
          return (
            <div>
              <MdOutlineError
                style={{ ...{ fontSize: "128px" }, ..._iconStyle.style }}
                className={"!text-[#f00] " + _iconStyle.css}
              />
            </div>
          );
        default:
          trgIcon = QueryIcon;
          break;
      }

      return (
        trgIcon ?? (
          <img
            className={_iconStyle.css}
            style={_iconStyle.style}
            src={trgIcon}
          />
        )
      );
    }
  };

  return (
    <BasicDialog
      Header={title}
      Content={content}
      Image={getImage()}
      Footer={
        buttons && (
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
        )
      }
      isOpen={isOpen}
      headerStyle={_headerStyle}
      contentStyle={contentStyle}
      containerStyle={containerStyle}
      footerStyle={_buttonDivStyle}
    />
  );
};

export default QueryDialog;
