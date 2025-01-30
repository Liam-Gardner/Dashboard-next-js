import { TransactionResponse } from '@/pages/api/transactions';

type Props = {
  limit: number;
  handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: TransactionResponse;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  page: number;
};
export default function Pagination({
  data,
  handleLimitChange,
  handleNextPage,
  handlePreviousPage,
  limit,
  page,
}: Props) {
  return (
    <div className="flex justify-between items-center pt-4">
      <div className="flex items-center gap-4">
        <select value={limit} onChange={handleLimitChange} className="p-2 outline-none bg-inherit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      {data.transactions.length ? (
        <div className="hidden sm:block">
          Page {page} of {Math.ceil(data.total / limit)}
        </div>
      ) : null}
      <div className="flex gap-2">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(data.total / limit)}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
