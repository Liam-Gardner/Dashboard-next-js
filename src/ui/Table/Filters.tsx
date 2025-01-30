import { TransactionResponse } from '@/pages/api/transactions';
import { getTodayDate } from '@/utils/dates/helpers';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  customerName: string;
  data: TransactionResponse | undefined;
  disabled: boolean;
  endDate: string;
  handleCustomerChange: (name: string) => void;
  handleFilter: (e: React.FormEvent) => void;
  startDate: string;
  setDateRange: Dispatch<SetStateAction<{ start: string; end: string }>>;
  setCustomerName: Dispatch<SetStateAction<string>>;
};
export default function Filters({
  disabled,
  handleFilter,
  startDate,
  endDate,
  setDateRange,
  customerName,
  handleCustomerChange,
  setCustomerName,
  data,
}: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  const handleDateFilter = (date: string, type: 'start' | 'end') => {
    const newStartDate = type === 'start' ? date : startDate ?? getTodayDate();
    const newEndDate = type === 'end' ? date : endDate ?? getTodayDate();

    const startDateObj = new Date(newStartDate);
    const endDateObj = new Date(newEndDate);

    if (startDateObj > endDateObj) {
      setErrorMessage('Start date cannot be greater than end date');
      return;
    }

    setErrorMessage('');
    setDateRange({
      start: newStartDate,
      end: newEndDate,
    });
  };

  return (
    <form onSubmit={handleFilter} className="mb-4 space-y-4 ">
      <div className="flex flex-col md:flex-row gap-4 ">
        <div>
          <label
            htmlFor="startDate"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => handleDateFilter(e.target.value, 'start')}
            className="p-2 border rounded dark:bg-gray-700"
            disabled={disabled}
          />
        </div>
        <div className="max-w-[151px]">
          <label
            htmlFor="endDate"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => handleDateFilter(e.target.value, 'end')}
            className="p-2 border rounded dark:bg-gray-700"
            disabled={disabled}
          />
          {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
        </div>
        <select
          value={customerName}
          onChange={(e) => handleCustomerChange(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 disabled:bg-customDisabled disabled:hover:bg-customDisabled disabled:text-gray-800 h-11 mt-4 w-[160px]"
          disabled={disabled}
        >
          <option value="">All Customers</option>
          {data?.transactions.map((t) => (
            <option value={t.customerName} key={`${t.customerName}-${t.date}`}>
              {t.customerName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-customDisabled disabled:hover:bg-customDisabled disabled:text-gray-500 h-11 mt-4"
          disabled={disabled}
        >
          Apply
        </button>
        <button
          type="button"
          onClick={() => {
            setDateRange({ start: '', end: '' });
            setCustomerName('');
          }}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 disabled:bg-customDisabled disabled:hover:bg-customDisabled disabled:text-gray-500 h-11 mt-4"
          disabled={disabled}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
