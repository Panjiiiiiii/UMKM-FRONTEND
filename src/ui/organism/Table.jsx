import { TableRow } from "../molecules/TableRow";

export const TableComponent = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
        {/* Header */}
        <thead>
          <TableRow rowData={columns} isHeader={true} />
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} rowData={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
