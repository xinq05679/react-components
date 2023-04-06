import { createContext, useContext, useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import QueryDialog from "./QueryDialog";
import { QueryDialogType } from "../../metadata/QueryDialogType";
import { BasicButtonProps } from "../../components/button/BasicButton";
import { ButtonType } from "../../metadata/ButtonType";

export interface QueryDialogSettings {
  title?: string;
  content?: string;
  icon?: string;
  buttons?: BasicButtonProps[];
  type?: QueryDialogType;
  headerStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  contentStyle?: ComponentStyleMerging;
  containerStyle?: ComponentStyleMerging;
}

export interface QueryDialogContextValue {
  settings: QueryDialogSettings;
  isOpen: boolean;
  openQueryDialog: (settings: QueryDialogSettings) => void;
  closeQueryDialog: () => void;
}

const QueryDialogContext = createContext<QueryDialogContextValue | null>(null);

export const QueryDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<QueryDialogSettings>({
    title: "Question",
    content: "Are you sure you want to clean all 87 items? ...............",
    buttons: [
      {
        children: "Yes",
        onClicked: () => {
          closeQueryDialog();
        },
      },
      {
        children: "No",
        type: ButtonType.Secondary,
      },
    ],
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openQueryDialog = (settings: QueryDialogSettings) => {
    setSettings(settings);
    setIsOpen(true);
  };

  const closeQueryDialog = () => {
    setSettings({});
    setIsOpen(false);
  };

  return (
    <QueryDialogContext.Provider
      value={{
        openQueryDialog,
        closeQueryDialog,
        isOpen,
        settings,
      }}
    >
      <QueryDialog />
      {children}
    </QueryDialogContext.Provider>
  );
};

const useQueryDialog = (): QueryDialogContextValue => {
  return useContext(QueryDialogContext) as QueryDialogContextValue;
};

export default useQueryDialog;