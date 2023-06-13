import {
  ComponentStyle,
  ComponentStyleMerging,
  StyleMergingMode,
} from "../metadata/ComponentStyle";
import { twMerge } from "tailwind-merge";

export function MergeComponentStyle(
  originStyle: ComponentStyle,
  newStyle?: ComponentStyleMerging
): ComponentStyle {
  const mergedStyle: ComponentStyleMerging = {
    css: originStyle.css,
    style: originStyle.style,
    cssMode: newStyle?.cssMode,
    styleMode: newStyle?.styleMode,
  };

  if (!newStyle) return mergedStyle;

  switch (newStyle.cssMode) {
    case StyleMergingMode.replace:
      mergedStyle.css = newStyle.css;
      break;
    case StyleMergingMode.none:
      break;
    default:
      mergedStyle.css = twMerge(originStyle.css, newStyle.css);
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
