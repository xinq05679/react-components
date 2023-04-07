import { useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicLinkProps {
  text?: string;
  url?: string;
  linkStyle?: ComponentStyleMerging;
  onClicked?: () => void;
}

const BasicLink: React.FC<BasicLinkProps> = ({
  text,
  url,
  linkStyle,
  onClicked,
}) => {
  const _linkStyle = MergeComponentStyle(
    {
      css: classNames(
        "underline underline-offset-2 font-bold text-[#1a0dab] hover:text-[#1a0dab99] visited:text-[#681da8]"
      ),
    },
    linkStyle
  );

  const handleClick = () => {
    onClicked?.();
  };

  return (
    <a
      className={_linkStyle?.css}
      style={_linkStyle?.style}
      href={url || `#${crypto.randomUUID()}`}
      onClick={handleClick}
    >
      {text}
    </a>
  );
};

export default BasicLink;
