import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { BiDownArrow } from "react-icons/bi";
import { useRef, useState, useEffect } from "react";

export interface SelectItem {
  label: string;
  name?: string;
}

export interface BasicSelectProps {
  items: SelectItem[];
  selectedLabel?: string;
  placeholder?: string;
  containerStyle?: ComponentStyleMerging;
  placeholderStyle?: ComponentStyleMerging;
  selectStyle?: ComponentStyleMerging;
  arrowStyle?: ComponentStyleMerging;
  optionsDivStyle?: ComponentStyleMerging;
  optionStyle?: ComponentStyleMerging;
  onSelectedItemChanged?: (selectedItem: string) => void;
}

export const BasicSelect: React.FC<BasicSelectProps> = ({
  items,
  selectedLabel,
  placeholder,
  placeholderStyle,
  selectStyle,
  containerStyle,
  arrowStyle,
  optionsDivStyle,
  optionStyle,
  onSelectedItemChanged,
}) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem | undefined>(
    items.find((item) => item.label === selectedLabel)
  );
  const [openDropDown, setOpenDropDown] = useState(false);
  const [optionDivHeight, setOptionDivHeight] = useState(0);
  const [highlightSelected, setHighlightSelected] = useState(false);
  const optionsDivRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeDropDown = (event: any) => {
      if (selectRef?.current && selectRef.current.contains(event.target)) {
        return;
      } else if (
        optionsDivRef?.current &&
        !optionsDivRef.current.contains(event.target)
      ) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener("click", closeDropDown, true);

    return document.removeEventListener("click", closeDropDown);
  }, []);

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames("flex flex-col items-center", "relative"),
    },
    containerStyle
  );

  const _placeholderStyle = MergeComponentStyle(
    {
      css: classNames("text-[#888]"),
    },
    placeholderStyle
  );

  const _selectStyle = MergeComponentStyle(
    {
      css: classNames(
        "w-[100%] h-[24px]",
        "cursor-[pointer]",
        "outline-0",
        "border border-[#888]",
        "flex items-center",
        "bg-[#fff]"
      ),
    },
    selectStyle
  );

  const _arrowStyle = MergeComponentStyle(
    {
      css: classNames("border-l-[1px] border-l-[#888]", "h-[100%]"),
    },
    arrowStyle
  );

  const _optionsDivStyle = MergeComponentStyle(
    {
      css: classNames(
        "bottom-[0px]",
        "w-[100%]",
        "flex flex-col",
        "border border-[#888]",
        "absolute",
        "bg-[#fff]",
        "group",
        "z-[99]"
      ),
      style: {
        bottom: `-${optionDivHeight}px`,
      },
    },
    optionsDivStyle
  );

  const _optionStyle = MergeComponentStyle(
    {
      css: classNames(
        "cursor-pointer",
        [
          "[&:hover]:bg-[#1e90ff]",
          "[&:hover]:text-[#fff]",
          "[&:hover]:font-bold",
        ],
        "group-[&[data-highlight='true']]:[&[data-select='true']]:bg-[#1e90ff]",
        "group-[&[data-highlight='true']]:[&[data-select='true']]:text-[#fff]",
        "group-[&[data-highlight='true']]:[&[data-select='true']]:font-bold"
      ),
    },
    optionStyle
  );

  // Get height of the option containter to put it under the select
  if (optionsDivRef.current) {
    const height = optionsDivRef.current.clientHeight;
    if (height != 0 && height != optionDivHeight) {
      setOptionDivHeight(height);
    }
  }

  const handleOptionClick = (
    event: React.MouseEvent<HTMLDivElement>,
    option: SelectItem
  ) => {
    setSelectedItem(option);
    setOpenDropDown(false);
    onSelectedItemChanged?.(option.label);
  };

  return (
    <>
      <div className={_containerStyle.css} style={_containerStyle.style}>
        {/* Select */}
        <div
          className={_selectStyle.css}
          style={_selectStyle.style}
          ref={selectRef}
          onClick={() => {
            setOpenDropDown(!openDropDown);
            setHighlightSelected(true);
          }}
        >
          <div className="grow">
            {selectedItem ? (
              selectedItem.name || selectedItem.label
            ) : (
              <div
                className={_placeholderStyle.css}
                style={_placeholderStyle.style}
              >
                {placeholder}
              </div>
            )}
          </div>
          <BiDownArrow className={_arrowStyle.css} style={_arrowStyle.style} />
        </div>
        {/* Option */}
        {openDropDown && (
          <div
            data-highlight={highlightSelected}
            className={_optionsDivStyle.css}
            style={_optionsDivStyle.style}
            ref={optionsDivRef}
            onMouseEnter={() => setHighlightSelected(false)}
          >
            {items.map((item, index) => (
              <div
                data-select={selectedItem?.label === item.label}
                key={index}
                className={_optionStyle.css}
                style={_optionStyle.style}
                onClick={(event) => handleOptionClick(event, item)}
              >
                {item.name || item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BasicSelect;
