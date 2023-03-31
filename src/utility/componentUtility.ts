import {
  ComponentStyle,
  ComponentStyleMerging,
  StyleMergingMode,
} from "../metadata/ComponentStyle";
import classNames from "classnames";

export function MergeComponentStyle(
  originStyle: ComponentStyle,
  newStyle?: ComponentStyleMerging
): ComponentStyle {
  const mergedStyle: ComponentStyle = {
    css: originStyle.css,
    style: originStyle.style,
  };

  if (!newStyle) return mergedStyle;

  switch (newStyle.cssMode) {
    case StyleMergingMode.replace:
      mergedStyle.css = newStyle.css;
      break;
    case StyleMergingMode.none:
      break;
    default:
      mergedStyle.css = classNames(originStyle.css, newStyle.css);
      break;
  }

  switch (newStyle.styleMode) {
    case StyleMergingMode.replace:
      mergedStyle.style = { ...newStyle.style };
      break;
    case StyleMergingMode.none:
      break;
    default:
      mergedStyle.style = { ...originStyle.style, ...newStyle.style };
      break;
  }

  return mergedStyle;
}
