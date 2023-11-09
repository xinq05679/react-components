export interface Margin {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export function getCSSMargin(margin?: Margin) {
  return `${margin?.top || 0}px ${margin?.right || 0}px ${
    margin?.bottom || 0
  }px ${margin?.left || 0}px`;
}
