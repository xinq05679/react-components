import { createContext, useContext, useState } from "react";
import ProgressBarDialog from "./ProgressBarDialog";
import { BasicButtonProps } from "../../components/button/BasicButton";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";

export interface ProgressBarDialogSettings {
  title?: string;
  content?: string;
  icon?: string;
  progressValue?: number;
  buttons?: BasicButtonProps[];
  headerStyle?: ComponentStyleMerging;
  iconStyle?: ComponentStyleMerging;
  contentStyle?: ComponentStyleMerging;
  containerStyle?: ComponentStyleMerging;
  bodyStyle?: ComponentStyleMerging;
  ProgressBar?: React.FC;
  buttonDivStyle?: ComponentStyleMerging;
}

export interface ProgressBarDialogContextValue {
  settings: ProgressBarDialogSettings;
  isOpen: boolean;
  openProgressBarDialog: (settings: ProgressBarDialogSettings) => void;
  closeProgressBarDialog: () => void;
}

const ProgressBarDialogContext =
  createContext<ProgressBarDialogContextValue | null>(null);

export const ProgressBarDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [settings, setSettings] = useState<ProgressBarDialogSettings>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openProgressBarDialog = (newSettings: ProgressBarDialogSettings) => {
    setSettings(newSettings);
    setIsOpen(true);
  };

  const closeProgressBarDialog = () => {
    setSettings({});
    setIsOpen(false);
  };

  return (
    <ProgressBarDialogContext.Provider
      value={{
        settings,
        isOpen,
        openProgressBarDialog,
        closeProgressBarDialog,
      }}
    >
      <ProgressBarDialog />
      {children}
    </ProgressBarDialogContext.Provider>
  );
};

export const useProgressBarDialog = (): ProgressBarDialogContextValue => {
  return useContext(ProgressBarDialogContext) as ProgressBarDialogContextValue;
};

export default useProgressBarDialog;
