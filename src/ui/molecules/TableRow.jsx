import { TableCell } from "../atoms/table/TableCell";

export const TableRow = ({ rowData, isHeader = false }) => {
    return (
      <tr className={`${isHeader ? "" : "hover:bg-gray-100"} border-b`}>
        {rowData.map((cell, index) => (
          <TableCell key={index} isHeader={isHeader}>
            {cell}
          </TableCell>
        ))}
      </tr>
    );
  };