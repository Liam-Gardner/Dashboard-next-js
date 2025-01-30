import { TransactionResponse } from '@/pages/api/transactions';

export const getTransactionsKey = 'getTransactions';
export const getTransactions = async ({
  startDate,
  endDate,
  customerName = '',
  limit = 5,
  page = 1,
  sortDirection = 'dsc',
}: {
  startDate?: string;
  endDate?: string;
  customerName?: string;
  limit?: number;
  page?: number;
  sortDirection?: 'asc' | 'dsc';
}): Promise<TransactionResponse> => {
  try {
    const response = await fetch(
      `/api/transactions?startDate=${startDate}&endDate=${endDate}&customerName=${customerName}&page=${page}&limit=${limit}&sortDirection=${sortDirection}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    const data = (await response.json()) as TransactionResponse;
    return data;
  } catch (error) {
    // TODO: log errors
    throw error;
  }
};
