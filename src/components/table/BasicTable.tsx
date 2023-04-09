import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";

export interface BasicTableProps {
  headerCell?: React.ReactNode[];
  tableCell: React.ReactNode[][];
  tableStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  rowStyle?: ComponentStyleMerging;
  cellStyle?: ComponentStyleMerging;
}

export const BasicTable: React.FC<BasicTableProps> = ({
  headerCell,
  tableCell,
  tableStyle,
  headerStyle,
  rowStyle,
  cellStyle,
}) => {
  const _tableStyle = MergeComponentStyle(
    {
      css: "w-[100%] table-auto border-separate border-spacing-y-1",
    },
    tableStyle
  );

  const _headerStyle = MergeComponentStyle(
    {
      css: "capitalize bg-[#0e6db7] text-[#fff] text-xl",
    },
    headerStyle
  );

  const _rowStyle = MergeComponentStyle(
    {
      css: "even:bg-[#fff] odd:bg-[#f0f0f0] text-center  hover:bg-[#cce4f1]",
    },
    rowStyle
  );

  const _cellStyle = MergeComponentStyle({}, cellStyle);

  return (
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
  );
};

export default BasicTable;
