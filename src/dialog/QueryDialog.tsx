import QueryIcon from "../resources/image/query.png";
import BasicDialog from "./BasicDialog";
import { QueryDialogType } from "../metadata/QueryDialogType";
import { MergeComponentStyle } from "../utility/componentUtility";
import useQueryDialog from "./useQueryDialog";
import BasicButton from "../components/button/BasicButton";

const QueryDialog: React.FC = () => {
  const { isOpen, settings } = useQueryDialog();
  const {
    title,
    content,
    icon,
    buttons,
    type = QueryDialogType.Info,
    iconStyle,
    titleStyle,
    contentStyle,
    containerStyle,
  } = settings;

  const getImage = () => {
    if (icon) return icon;

    switch (type) {
      default:
        return QueryIcon;
    }
  };

  const _iconStyle = MergeComponentStyle(
    {
      css: "h-20",
    },
    iconStyle
  );

  return (
    <BasicDialog
      Header={title}
      Content={content}
      Image={
        <img
          className={_iconStyle.css}
          style={_iconStyle.style}
          src={getImage()}
        ></img>
      }
      Footer={
        buttons && (
          <>
            {buttons.map((button, index) => {
              return (
                <BasicButton
                  key={index}
                  {...button}
                  customizedStyle={{ css: "h-10" }}
                />
              );
            })}
          </>
        )
      }
      isOpen={isOpen}
      headerStyle={titleStyle}
      contentStyle={contentStyle}
      containerStyle={containerStyle}
    />
  );
};

export default QueryDialog;