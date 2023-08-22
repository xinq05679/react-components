import classNames from "classnames";
import { useLayoutEffect, useRef, useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { Fragment } from "react";

export interface BasicTableProps {
  headRow?: React.ReactNode;
  tableRows: React.ReactNode[];
  tableDivStyle?: ComponentStyleMerging;
  tableStyle?: ComponentStyleMerging;
  theadStyle?: ComponentStyleMerging;
  tbodyStyle?: ComponentStyleMerging;
}

export const BasicTable: React.FC<BasicTableProps> = ({
  headRow,
  tableRows,
  tableDivStyle,
  tableStyle,
  theadStyle,
  tbodyStyle,
}) => {
  const _tableDivStyle = MergeComponentStyle(
    {
      css: `overflow-auto m-auto h-[100%] w-[100%] relative`,
    },
    tableDivStyle
  );

  const _tableStyle = MergeComponentStyle(
    {
      css: classNames(
        "w-[100%] absolute table-auto border-separate border-spacing-y-1"
      ),
    },
    tableStyle
  );

  const _theadStyle = MergeComponentStyle(
    {
      css: classNames("sticky top-0", "bg-[#0e6db7] text-[#fff]"),
    },
    theadStyle
  );

  const _tbodyStyle = MergeComponentStyle(
    {
      css: "even:[&>tr]:bg-[#fff] odd:[&>tr]:bg-[#f0f0f0] [&>tr]:text-center hover:[&>tr]:bg-[#cce4f1]",
    },
    tbodyStyle
  );

  return (
    <div className={_tableDivStyle.css} style={_tableDivStyle.style}>
      <table className={_tableStyle.css} style={_tableStyle.style}>
        {headRow && (
          <thead className={_theadStyle.css} style={_theadStyle.style}>
            {headRow}
          </thead>
        )}

        <tbody className={_tbodyStyle.css} style={_tbodyStyle.style}>
          {tableRows.map((row, rowIdx) => {
            return <Fragment key={rowIdx}>{row}</Fragment>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
