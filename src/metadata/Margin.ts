export interface Margin {
  top?: number | "auto";
  bottom?: number | "auto";
  left?: number | "auto";
  right?: number | "auto";
}

export function getCSSMargin(margin?: Margin) {
  var top = margin?.top || "0";
  if (top !== "auto") top = `${top}px`;

  var right = margin?.right || "0";
  if (right !== "auto") right = `${right}px`;

  var bottom = margin?.bottom || "0";
  if (bottom !== "auto") bottom = `${bottom}px`;

  var left = margin?.left || "0";
  if (left !== "auto") left = `${left}px`;

  return `${top} ${right} ${bottom} ${left}`;
}
