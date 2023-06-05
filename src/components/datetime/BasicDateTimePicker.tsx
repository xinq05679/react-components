import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { useState } from "react";

export interface BasicDateTimePickerProps
  extends Omit<ReactDatePickerProps, "selected" | "onChange" | "dateFormat"> {
  dateTimePickerStyle?: ComponentStyleMerging;
  dateTime: Date | null;
  dateFormat?: string;
  placeholderText?: string;
  onDateTimeChanged?: (date: Date | null) => void;
  onSubmit?: (date: Date | null) => void;
  [key: string]: any;
}

export const BasicDateTimePicker: React.FC<BasicDateTimePickerProps> = ({
  dateTimePickerStyle,
  onDateTimeChanged,
  onSubmit,
  placeholderText = "",
  dateFormat = "yyyy-MM-dd, h:mm aa",
  dateTime = null,
  onCalendarClose,
  others,
}) => {
  const [localDate, setLocaDate] = useState<Date | null>(null);
  const [currentLocalDate, setCurrentLocalDate] = useState<Date | null>(null);

  if (dateTime) {
    if (dateTime.toLocaleString() !== currentLocalDate?.toLocaleString()) {
      setCurrentLocalDate(dateTime);
      setLocaDate(dateTime);
    }
  } else {
    if (currentLocalDate) {
      setCurrentLocalDate(dateTime);
      setLocaDate(dateTime);
    }
  }

  const _dateTimePickerStyle = MergeComponentStyle(
    {
      css: classNames(
        [
          "h-[100%] w-[100%]",
          "outline-0",
          "border border-[#ddd]",
          "cursor-pointer",
          "pl-[5px]",
          "grow",
        ],
        ["hover:border-[#00f]", "focus:border-[#00f]", "focus:cursor-auto"],
        [
          "[&[readOnly]]:bg-[#ccc]",
          "[&[readOnly]]:hover:border-[#ddd]",
          "[&[readOnly]]:focus:border-[#ddd]",
          "[&[readOnly]]:cursor-auto",
        ]
      ),
    },
    dateTimePickerStyle
  );

  function handleDateTimeChange(date: Date) {
    setLocaDate(date);
    onDateTimeChanged?.(date);
  }

  function handleCalendarClose() {
    setCurrentLocalDate(localDate);
    onSubmit?.(localDate);
  }

  return (
    <DatePicker
      className={_dateTimePickerStyle.css}
      selected={localDate}
      onYearChange={handleDateTimeChange}
      onMonthChange={handleDateTimeChange}
      onChange={handleDateTimeChange}
      onCalendarClose={() => {
        handleCalendarClose(), onCalendarClose?.();
      }}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      showTimeInput
      dropdownMode="select"
      dateFormat={dateFormat}
      placeholderText={placeholderText}
      {...others}
    />
  );
};

export default BasicDateTimePicker;
