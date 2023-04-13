import { useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicLinkProps {
  text?: string;
  url?: string;
  linkStyle?: ComponentStyleMerging;
  isVisited?: boolean;
  onClicked?: (event: React.MouseEvent<HTMLAnchorElement>) => boolean;
}

export const BasicLink: React.FC<BasicLinkProps> = ({
  text,
  url,
  linkStyle,
  onClicked,
  isVisited,
}) => {
  const [visted, setVisited] = useState(isVisited);
  const _linkStyle = MergeComponentStyle(
    {
      css: classNames(
        "underline underline-offset-2 font-bold",
        "text-[#1a0dab]",
        "hover:text-[#1a0dab99]",
        "aria-[label=visited]:text-[#681da8]"
      ),
    },
    linkStyle
  );

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onClicked) {
      setVisited(true);
    } else {
      setVisited(onClicked?.(event));
    }
  };

  return (
    <a
      aria-label={visted ? "visited" : ""}
      className={_linkStyle?.css}
      style={_linkStyle?.style}
      href={url || `#`}
      onClick={(event) => handleClick(event)}
    >
      {text}
    </a>
  );
};

export default BasicLink;
