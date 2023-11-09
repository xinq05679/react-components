export interface Margin {
  top?: number | "auto";
  bottom?: number | "auto";
  left?: number | "auto";
  right?: number | "auto";
}

export function getCSSMargin(margin?: Margin) {
  return `${margin?.top || "0"} ${margin?.right || "0"} ${
    margin?.bottom || "0"
  } ${margin?.left || "0"}`;
}
