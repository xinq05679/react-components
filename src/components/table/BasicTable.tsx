import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";

export interface BasicTableProps {
  headerCell: React.ReactNode[];
  tableCell: [React.ReactNode[]];
  tableStyle?: ComponentStyleMerging;
  headerStyle?: ComponentStyleMerging;
  rowStyle?: ComponentStyleMerging;
}

const BasicTable: React.FC<BasicTableProps> = ({
  headerCell,
  tableCell,
  tableStyle,
  headerStyle,
  rowStyle,
}) => {
  const _tableStyle = MergeComponentStyle(
    {
      css: "w-full table-auto border-separate border-spacing-y-1",
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
      css: "even:bg-[#fff] odd:bg-[#f0f0f0] text-center",
    },
    rowStyle
  );

  return (
    <table className={_tableStyle.css} style={_tableStyle.style}>
      <thead className={_headerStyle.css} style={_headerStyle.style}>
        <tr>
          {headerCell.map((cell, index) => (
            <th key={index}>{cell}</th>
          ))}
        </tr>
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
                <td key={`cell-${rowIdx}-${colIdx}`}>{cell}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BasicTable;
