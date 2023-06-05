import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";
import { useState } from "react";

export interface BasicDateTimePickerProps {
  dateTimePickerStyle?: ComponentStyleMerging;
  dateTime?: Date;
  dateFormat?: string;
  onDateTimeChanged?: (date: Date) => void;
  onSubmit?: (date: Date) => void;
  others?: Omit<ReactDatePickerProps, "selected" | "onChange" | "dateFormat">;
}

export const BasicDateTimePicker: React.FC<BasicDateTimePickerProps> = ({
  dateTimePickerStyle,
  onDateTimeChanged,
  onSubmit,
  dateFormat = "yyyy-MM-dd, h:mm aa",
  dateTime = new Date(),
  others,
}) => {
  const [localDate, setLocaDate] = useState<Date>(new Date());
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  if (!dateTime) {
    if (currentDateTime) {
      setCurrentDateTime("");
      setLocaDate(dateTime);
    }
  } else {
    if (currentDateTime !== dateTime.toString()) {
      setCurrentDateTime(dateTime.toString());
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
    onSubmit?.(localDate);
  }

  return (
    <DatePicker
      className={_dateTimePickerStyle.css}
      selected={localDate}
      onYearChange={handleDateTimeChange}
      onChange={handleDateTimeChange}
      onCalendarClose={handleCalendarClose}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      showTimeInput
      dropdownMode="select"
      dateFormat={dateFormat}
      {...others}
    />
  );
};

export default BasicDateTimePicker;
