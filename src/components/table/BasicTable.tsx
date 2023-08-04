import classNames from "classnames";
import { useLayoutEffect, useRef, useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import { Fragment } from "react";

export interface BasicTableProps {
  headerCell?: React.ReactNode[];
  tableCell: React.ReactNode[][];
  tableDivStyle?: ComponentStyleMerging;
  tableStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  rowStyle?: ComponentStyleMerging;
  onRowClicked?: (
    event: React.MouseEvent<HTMLTableRowElement>,
    rowIdx: number
  ) => void;
}

export const BasicTable: React.FC<BasicTableProps> = ({
  headerCell,
  tableCell,
  tableDivStyle,
  tableStyle,
  headerStyle,
  rowStyle,
  onRowClicked,
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

  const _headerStyle = MergeComponentStyle(
    {
      css: classNames("sticky top-0", "bg-[#0e6db7] text-[#fff]"),
    },
    headerStyle
  );

  const _rowStyle = MergeComponentStyle(
    {
      css: "even:bg-[#fff] odd:bg-[#f0f0f0] text-center hover:bg-[#cce4f1]",
    },
    rowStyle
  );

  return (
    <div className={_tableDivStyle.css} style={_tableDivStyle.style}>
      <table className={_tableStyle.css} style={_tableStyle.style}>
        <thead className={_headerStyle.css} style={_headerStyle.style}>
          {headerCell && (
            <tr>
              {headerCell.map((cell, index) => (
                <Fragment key={index}>{cell}</Fragment>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {tableCell.map((row, rowIdx) => {
            return (
              <tr
                key={`row-${rowIdx}`}
                className={_rowStyle.css}
                style={_rowStyle.style}
                onClick={(event) => {
                  onRowClicked?.(event, rowIdx);
                }}
              >
                {row.map((cell, colIdx) => (
                  <Fragment key={`cell-${rowIdx}-${colIdx}`}>{cell}</Fragment>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
