import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { BiDownArrow } from "react-icons/bi";
import { useRef, useState, useEffect } from "react";
import BasicPortal from "../portal/BasicPortal";

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
  readOnly?: boolean;
}

export const BasicSelect: React.FC<BasicSelectProps> = ({
  items,
  selectedLabel = "",
  placeholder,
  placeholderStyle,
  selectStyle,
  containerStyle,
  arrowStyle,
  optionsDivStyle,
  optionStyle,
  onSelectedItemChanged,
  readOnly = false,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [optionDivHeight, setOptionDivHeight] = useState(0);
  const [highlightSelected, setHighlightSelected] = useState(false);
  const optionsDivRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.label === selectedLabel);

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
    document.addEventListener("scroll", closeDropDown, true);

    return () => {
      document.removeEventListener("click", closeDropDown);
      document.removeEventListener("scroll", closeDropDown);
    };
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
        "cursor-pointer",
        "pl-[5px]",
        "outline-0",
        "border border-[#888]",
        "flex items-center",
        "bg-[#fff]",
        "text-left",
        ["[&[data-readonly=true]]:bg-[#ccc]"]
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
        "flex flex-col",
        "border border-[#888]",
        "absolute",
        "bg-[#fff]",
        "group",
        "text-left",
        "overflow-auto"
      ),
      style: {
        top: selectRef.current?.getBoundingClientRect().bottom,
        left: selectRef.current?.getBoundingClientRect().left,
        width: selectRef.current?.getBoundingClientRect().width,
      },
    },
    optionsDivStyle
  );

  const _optionStyle = MergeComponentStyle(
    {
      css: classNames(
        "pl-[5px]",
        "group-[&[data-readonly=false]]:cursor-pointer",
        [
          "group-[&[data-readonly=false]]:[&:hover]:bg-[#1e90ff]",
          "group-[&[data-readonly=false]]:[&:hover]:text-[#fff]",
          "group-[&[data-readonly=false]]:[&:hover]:font-bold",
        ],
        "group-[&[data-highlight=true]]:[&[data-select='true']]:bg-[#1e90ff]",
        "group-[&[data-highlight=true]]:[&[data-select='true']]:text-[#fff]",
        "group-[&[data-highlight=true]]:[&[data-select='true']]:font-bold",
        "group-[&[data-readonly=true]]:bg-[#ccc]"
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
    if (readOnly) return setOpenDropDown(false);

    setOpenDropDown(false);
    onSelectedItemChanged?.(option.label);
  };

  return (
    <>
      <div className={_containerStyle.css} style={_containerStyle.style}>
        {/* Select */}
        <div
          data-readonly={readOnly}
          className={_selectStyle.css}
          style={_selectStyle.style}
          ref={selectRef}
          onClick={() => {
            setOpenDropDown(!openDropDown);
            setHighlightSelected(!readOnly);
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
          <BasicPortal>
            <div
              data-highlight={highlightSelected}
              data-readonly={readOnly}
              className={_optionsDivStyle.css}
              style={_optionsDivStyle.style}
              ref={optionsDivRef}
              onMouseEnter={() => setHighlightSelected(false)}
            >
              {items.map((item, index) => (
                <div
                  data-select={selectedLabel === item.label}
                  key={index}
                  className={_optionStyle.css}
                  style={_optionStyle.style}
                  onClick={(event) => handleOptionClick(event, item)}
                >
                  {item.name || item.label}
                </div>
              ))}
            </div>
          </BasicPortal>
        )}
      </div>
    </>
  );
};

export default BasicSelect;
