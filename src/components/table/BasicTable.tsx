import classNames from "classnames";
import { useLayoutEffect, useRef, useState } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";

export interface BasicTableProps {
  headerCell?: React.ReactNode[];
  tableCell: React.ReactNode[][];
  tableDivStyle?: ComponentStyleMerging;
  tableStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  rowStyle?: ComponentStyleMerging;
  cellStyle?: ComponentStyleMerging;
}

export const BasicTable: React.FC<BasicTableProps> = ({
  headerCell,
  tableCell,
  tableDivStyle,
  tableStyle,
  headerStyle,
  rowStyle,
  cellStyle,
}) => {
  const _tableDivStyle = MergeComponentStyle(
    {
      css: `overflow-auto m-auto`,
    },
    tableDivStyle
  );

  const _tableStyle = MergeComponentStyle(
    {
      css: classNames(
        "w-[100%] relative table-auto border-separate border-spacing-y-1"
      ),
    },
    tableStyle
  );

  const _headerStyle = MergeComponentStyle(
    {
      css: "sticky top-0 capitalize bg-[#0e6db7] text-[#fff] text-xl",
    },
    headerStyle
  );

  const _rowStyle = MergeComponentStyle(
    {
      css: "even:bg-[#fff] odd:bg-[#f0f0f0] text-center hover:bg-[#cce4f1]",
    },
    rowStyle
  );

  const _cellStyle = MergeComponentStyle({}, cellStyle);

  return (
    <div className={_tableDivStyle.css} style={_tableDivStyle.style}>
      <table className={_tableStyle.css} style={_tableStyle.style}>
        <thead>
          {headerCell && (
            <tr>
              {headerCell.map((cell, index) => (
                <th
                  className={_headerStyle.css}
                  style={_headerStyle.style}
                  key={index}
                >
                  {cell}
                </th>
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
              >
                {row.map((cell, colIdx) => (
                  <td
                    key={`cell-${rowIdx}-${colIdx}`}
                    className={_cellStyle.css}
                    style={_cellStyle.style}
                  >
                    {cell}
                  </td>
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
