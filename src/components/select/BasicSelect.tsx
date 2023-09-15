import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { BiDownArrow } from "react-icons/bi";
import { useRef, useState, useEffect } from "react";
import BasicPortal from "../portal/BasicPortal";

export interface SelectItem {
  label: string;
  name?: string;
  style?: ComponentStyleMerging;
}

export interface BasicSelectProps {
  items: SelectItem[];
  name?: string;
  selectedLabel?: string;
  placeholder?: string;
  containerStyle?: ComponentStyleMerging;
  placeholderStyle?: ComponentStyleMerging;
  selectStyle?: ComponentStyleMerging;
  arrowStyle?: ComponentStyleMerging;
  optionsDivStyle?: ComponentStyleMerging;
  optionStyle?: ComponentStyleMerging;
  onSelectedItemChanged?: (selectedItem: string) => void;
  onSelectionListVisibleChanged?: (visible: boolean) => void;
  readOnly?: boolean;
}

export const BasicSelect: React.FC<BasicSelectProps> = ({
  items,
  name,
  selectedLabel = "",
  placeholder,
  placeholderStyle,
  selectStyle,
  containerStyle,
  arrowStyle,
  optionsDivStyle,
  optionStyle,
  onSelectedItemChanged,
  onSelectionListVisibleChanged,
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
        setOpenDropDown((s) => {
          onSelectionListVisibleChanged?.(false);
          return false;
        });
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
        [
          "[&[data-readonly=true]]:bg-[#eee]",
          "[&[data-readonly=true]]:border-[#ddd]",
          "[&[data-readonly=true]]:hover:border-[#ddd]",
          "[&[data-readonly=true]]:focus:border-[#ddd]",
          "[&[data-readonly=true]]:text-[#888]",
          "[&[data-readonly=true]]:cursor-auto",
        ]
      ),
    },
    selectStyle
  );

  const _arrowStyle = MergeComponentStyle(
    {
      css: classNames("border-l-[1px] border-l-[#888]", "h-[100%]", [
        "[&[data-readonly=true]]:border-[#ddd]",
      ]),
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
        "overflow-auto",
        [
          "[&[data-readonly=true]]:bg-[#eee]",
          "[&[data-readonly=true]]:border-[#ddd]",
          "[&[data-readonly=true]]:text-[#888]",
        ]
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
        [
          "group-[&[data-highlight=true]]:[&[data-select='true']]:bg-[#1e90ff]",
          "group-[&[data-highlight=true]]:[&[data-select='true']]:font-bold",
        ]
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
    setOpenDropDown((s) => {
      onSelectionListVisibleChanged?.(false);
      return false;
    });

    if (readOnly) return;

    if (option.label !== selectedLabel) {
      onSelectedItemChanged?.(option.label);
    }
  };

  function getAppearName(item: SelectItem) {
    return item.name !== undefined ? (
      item.name.trim() === "" ? (
        <br />
      ) : (
        item.name
      )
    ) : (
      item.label
    );
  }

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
            setOpenDropDown((s) => {
              onSelectionListVisibleChanged?.(!s);
              return !s;
            });
            setHighlightSelected(!readOnly);
          }}
        >
          <div className="grow">
            {selectedItem ? (
              getAppearName(selectedItem)
            ) : (
              <div
                className={_placeholderStyle.css}
                style={_placeholderStyle.style}
              >
                {placeholder}
              </div>
            )}
          </div>
          <BiDownArrow
            data-readonly={readOnly}
            className={_arrowStyle.css}
            style={_arrowStyle.style}
          />
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
              {items.map((item, index) => {
                const style = MergeComponentStyle(_optionStyle, item.style);
                return (
                  <div
                    data-select={selectedLabel === item.label}
                    key={index}
                    className={style.css}
                    style={style.style}
                    onClick={(event) => handleOptionClick(event, item)}
                  >
                    {getAppearName(item)}
                  </div>
                );
              })}
            </div>
          </BasicPortal>
        )}
        {/* Input */}
        <input name={name} value={selectedLabel} readOnly hidden />
      </div>
    </>
  );
};

export default BasicSelect;
