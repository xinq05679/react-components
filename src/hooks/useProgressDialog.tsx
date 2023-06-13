import { createContext, useState, useContext } from "react";
import {
  BasicProgressDialogProps,
  BasicProgressDialog,
} from "../components/dialog/BasicProgressDialog";

interface ProgressDialogContextValue {
  openProgressDialog: (props: BasicProgressDialogProps) => void;
  closeProgressDialog: () => void;
}

const ProgressDialogContext = createContext<ProgressDialogContextValue | null>(
  null
);

export const ProgressDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [props, setProps] = useState<BasicProgressDialogProps>({});
  const [isOpen, setIsOpen] = useState(false);

  const openProgressDialog = (props: BasicProgressDialogProps) => {
    setProps(props);
    setIsOpen(true);
  };

  const closeProgressDialog = () => {
    setIsOpen(false);
  };

  return (
    <ProgressDialogContext.Provider
      value={{ openProgressDialog, closeProgressDialog }}
    >
      {isOpen && <BasicProgressDialog {...props} />}
      {children}
    </ProgressDialogContext.Provider>
  );
};

export const useProgressDialog = () => {
  return useContext(ProgressDialogContext) as ProgressDialogContextValue;
};

export default useProgressDialog;
