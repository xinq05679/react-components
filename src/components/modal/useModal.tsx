import { createContext, useState, useContext } from "react";
import BasicProgressDialog from "../dialog/BasicProgressDialog";
import BasicQueryDialog from "../dialog/BasicQueryDialog";

export enum ModalType {
  BasicProgressDialog = 0,
  BasicQueryDialog,
  None,
}

export interface ModalContextValue {
  open: (type: ModalType, props?: any) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.None);
  const [props, setProps] = useState<any>(null);

  const open = (modalType: ModalType, props: any) => {
    setModalType(modalType);
    setProps(props);
    setIsOpen(true);
  };

  const close = () => {
    setModalType(ModalType.None);
    setProps(null);
    setIsOpen(false);
  };

  const renderedModal = () => {
    switch (modalType) {
      case ModalType.BasicProgressDialog:
        return <BasicProgressDialog {...props} />;
      case ModalType.BasicQueryDialog:
        return <BasicQueryDialog {...props} />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
      }}
    >
      {isOpen && renderedModal()}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  return useContext(ModalContext) as ModalContextValue;
};

export default useModal;
