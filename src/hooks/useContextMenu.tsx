import { createContext, useState, useContext } from "react";
import {
  BasicContextMenuProps,
  BasicContextMenu,
} from "../components/contextmenu/BasicContextMenu";

interface ContextMenuContextValue {
  openContextMenu: (props: BasicContextMenuProps) => void;
  closeContextMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

export const ContextMenuProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [props, setProps] = useState<BasicContextMenuProps>({
    items: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  const openContextMenu = (props: BasicContextMenuProps) => {
    setProps(props);
    setIsOpen(true);
  };

  const closeContextMenu = () => {
    setIsOpen(false);
  };

  return (
    <ContextMenuContext.Provider value={{ openContextMenu, closeContextMenu }}>
      {isOpen && <BasicContextMenu {...props} />}
      {children}
    </ContextMenuContext.Provider>
  );
};

export const useContextMenu = () => {
  return useContext(ContextMenuContext) as ContextMenuContextValue;
};

export default useContextMenu;
