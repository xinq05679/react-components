import classNames from "classnames";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import BasicCheckBox, {
  BasicCheckBoxProps,
  CheckBoxStatus,
} from "./BasicCheckBox";
import { Fragment } from "react";
import _ from "lodash";

export interface BasicMultiCheckBoxProps<T extends BasicCheckBoxProps> {
  items: T[];
  CheckBoxFC?: React.FC<T>;
  containerStyle?: ComponentStyleMerging;
  onCheckedChanged?: (item: T, checked: CheckBoxStatus) => void;
  vertical?: boolean;
  readOnly?: boolean;
}

export function BasicMultiCheckBox<T extends BasicCheckBoxProps>(
  props: BasicMultiCheckBoxProps<T>
) {
  const {
    items,
    CheckBoxFC = BasicCheckBox,
    containerStyle,
    onCheckedChanged,
    vertical = false,
    readOnly,
  } = props;

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("flex gap-[20px]", [
        "data-[vertical=true]:flex-col",
        "data-[vertical=true]:gap-[10px]",
      ]),
    },
    containerStyle
  );

  return (
    <>
      <div
        data-vertical={vertical}
        className={_containerStyle.css}
        style={_containerStyle.style}
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            <CheckBoxFC
              {...item}
              checked={item.checked}
              onCheckedChagned={(checkedState) => {
                onCheckedChanged?.(item, checkedState);
              }}
              readOnly={readOnly}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default BasicMultiCheckBox;
