export const TableCell = ({ children, isHeader = false }) => {
  return isHeader ? (
    <th className="px-4 py-2 border border-gray-300 bg-green-800 text-white text-left">
      {children}
    </th>
  ) : (
    <td className="px-4 py-2 border border-gray-300">{children}</td>
  );
};
