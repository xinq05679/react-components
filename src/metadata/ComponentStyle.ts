export enum StyleMergingMode {
  combine,
  replace,
  none,
}

export interface ComponentStyle {
  css?: string;
  style?: React.CSSProperties;
}

export interface ComponentStyleMerging extends ComponentStyle {
  cssMode?: StyleMergingMode;
  styleMode?: StyleMergingMode;
}
