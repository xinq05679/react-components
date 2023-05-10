import { createContext, useState, useContext } from "react";
import {
  BasicQueryDialogProps,
  BasicQueryDialog,
} from "../components/dialog/BasicQueryDialog";

interface QueryDialogContextValue {
  openQueryDialog: (props: BasicQueryDialogProps) => void;
  closeQueryDialog: () => void;
}

const QueryDialogContext = createContext<QueryDialogContextValue | null>(null);

export const QueryDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [props, setProps] = useState<BasicQueryDialogProps>({});
  const [isOpen, setIsOpen] = useState(false);

  const openQueryDialog = (props: BasicQueryDialogProps) => {
    setProps(props);
    setIsOpen(true);
  };

  const closeQueryDialog = () => {
    setIsOpen(false);
  };

  return (
    <QueryDialogContext.Provider value={{ openQueryDialog, closeQueryDialog }}>
      {isOpen && <BasicQueryDialog {...props} />}
      {children}
    </QueryDialogContext.Provider>
  );
};

export const useQueryDialog = (): QueryDialogContextValue => {
  return useContext(QueryDialogContext) as QueryDialogContextValue;
};

export default useQueryDialog;
