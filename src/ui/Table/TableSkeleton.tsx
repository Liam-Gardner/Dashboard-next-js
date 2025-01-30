export const TableSkeleton = ({ rows }: { rows: number }) => {
  return (
    <table className="w-full table-fixed">
      <thead className="text-left">
        <tr className="bg-gray-100">
          <th className="p-2">Date</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Description</th>
          <th className="p-2">Points</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, index) => (
          <TableBodySkeleton key={index} />
        ))}
      </tbody>
    </table>
  );
};

const TableBodySkeleton = () => {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
    </tr>
  );
};
