import { ArrowDownIcon } from '@/assets/icons/ArrowDownIcon';
import { ArrowUpIcon } from '@/assets/icons/ArrowUpIcon';
import { TransactionResponse } from '@/pages/api/transactions';

type Props = {
  handleDateSort: () => void;
  sortDirection: 'asc' | 'dsc';
  data: TransactionResponse | undefined;
};
export default function Table({ handleDateSort, sortDirection, data }: Props) {
  return (
    <table className="w-full table-auto">
      <thead className="text-left">
        <tr className="bg-gray-100 dark:bg-gray-700 dark:border-y dark:border-x">
          <th className="p-2 text-sm sm:text-base">
            <button onClick={handleDateSort} className="flex items-center">
              Date
              <span className="hidden sm:inline">
                {sortDirection === 'dsc' ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </span>
            </button>
          </th>
          <th className="p-2 text-sm sm:text-base">Customer</th>
          <th className="p-2 text-sm sm:text-base">Description</th>
          <th className="p-2 text-sm sm:text-base">Points</th>
        </tr>
      </thead>
      <tbody>
        {data?.transactions.map((transaction) => (
          <tr key={`${transaction.customerName} - ${transaction.date}`} className="border-b">
            <td className="p-2">{transaction.date}</td>
            <td className="p-2">{transaction.customerName}</td>
            <td className="p-2">{transaction.description}</td>
            <td className="p-2">{transaction.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
