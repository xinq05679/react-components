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
  readOnly?: boolean;
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
  readOnly,
  others,
}) => {
  const [localDate, setLocaDate] = useState<Date | null>(null);
  const [submitLocalDate, setSubmitLocalDate] = useState<Date | null>(null);

  if (dateTime?.toLocaleString() !== submitLocalDate?.toLocaleString()) {
    setSubmitLocalDate(dateTime);
    setLocaDate(dateTime);
  }

  const _dateTimePickerStyle = MergeComponentStyle(
    {
      css: classNames(
        [
          "h-[100%] w-[100%]",
          "outline-0",
          "border border-[#888]",
          "cursor-pointer",
          "pl-[5px]",
          "grow",
        ],
        ["hover:border-[#00f]", "focus:border-[#00f]", "focus:cursor-auto"],
        [
          "[&[readOnly]]:bg-[#eee]",
          "[&[readOnly]]:border-[#ddd]",
          "[&[readOnly]]:text-[#888]",
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
    if (localDate?.toLocaleString() === submitLocalDate?.toLocaleString())
      return;
    setSubmitLocalDate(localDate);
    onSubmit?.(localDate);
  }

  return (
    <DatePicker
      readOnly={readOnly}
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
