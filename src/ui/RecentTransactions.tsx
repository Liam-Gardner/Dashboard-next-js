import { getTransactions, getTransactionsKey } from '@/services/getTransactions';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { TableSkeleton } from './Table/TableSkeleton';
import ErrorCard from './Error/ErrorCard';
import WarningErrorIcon from '@/assets/icons/WarningIcon';
import Filters from './Table/Filters';
import Pagination from './Table/Pagination';
import Table from './Table/Table';

export default function RecentTransactions() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [customerName, setCustomerName] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortDirection, setSortDirection] = useState<'asc' | 'dsc'>('dsc');
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: [
      getTransactionsKey,
      dateRange.start,
      dateRange.end,
      limit,
      customerName,
      page,
      sortDirection,
    ],
    queryFn: () =>
      getTransactions({
        startDate: dateRange.start,
        endDate: dateRange.end,
        limit,
        customerName,
        page,
        sortDirection,
      }),
    placeholderData: keepPreviousData,
  });

  const handleDateSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('dsc');
    }
    if (sortDirection === 'dsc') {
      setSortDirection('asc');
    }
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && page < Math.ceil(data.total / limit)) {
      setPage(page + 1);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleCustomerChange = (name: string) => {
    setCustomerName(name);
    setPage(1);
  };

  const handleTryAgain = () => {
    queryClient.invalidateQueries({
      queryKey: [
        getTransactionsKey,
        dateRange.start,
        dateRange.end,
        limit,
        customerName,
        page,
        sortDirection,
      ],
    });
  };

  const disabled = isError || isPending;

  if (isError) {
    return (
      <ErrorCard
        disabled={isPending}
        errorMessage="No recent transactions found"
        handleTryAgain={handleTryAgain}
      />
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

      <Filters
        handleCustomerChange={handleCustomerChange}
        handleFilter={handleFilter}
        startDate={dateRange.start}
        endDate={dateRange.end}
        disabled={disabled}
        setDateRange={setDateRange}
        setCustomerName={setCustomerName}
        customerName={customerName}
        data={data}
      />

      {!isPending && !data.transactions.length && (
        <div className="flex p-6 bg-orange-300">
          <WarningErrorIcon />
          <p className="ml-4">No transactions found!</p>
        </div>
      )}

      {isPending ? (
        <TableSkeleton rows={limit} />
      ) : (
        <Table handleDateSort={handleDateSort} sortDirection={sortDirection} data={data} />
      )}

      {isPending ? (
        <></>
      ) : (
        <Pagination
          limit={limit}
          data={data}
          page={page}
          handleLimitChange={handleLimitChange}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
    </div>
  );
}
