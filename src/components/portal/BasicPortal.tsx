import ReactDOM from "react-dom";

export interface BasicPortal {
  children: React.ReactNode;
  portalId?: string;
}

export const BasicPortal: React.FC<BasicPortal> = ({
  children,
  portalId = "default-portal",
}) => {
  return ReactDOM.createPortal(
    children,
    (() => {
      let portal = document.getElementById(portalId);
      if (!portal) {
        portal = document.createElement("div");
        portal.id = portalId;
        document.querySelector("body")?.appendChild(portal);
      }
      return portal;
    })()
  );
};

export default BasicPortal;
