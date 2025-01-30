import type { NextApiRequest, NextApiResponse } from 'next';

type Transaction = {
  date: string;
  customerName: string;
  description: string;
  points: number;
};

type TransactionData = Array<Transaction>;
export type TransactionResponse = { transactions: TransactionData; total: number };

type QueryRequest = {
  startDate?: string;
  endDate?: string;
  customerName?: string;
  page?: string;
  limit?: string;
  sortDirection?: 'asc' | 'dsc';
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionResponse | { error: string }>
) {
  const {
    startDate,
    endDate,
    customerName,
    page = '1',
    limit = '5',
    sortDirection = 'dsc',
  } = req.query as QueryRequest;

  try {
    const result = await fetchTransactions();
    let filteredTransactions = result;

    // Sort by most recent date if no date filters are applied
    if (!startDate && !endDate) {
      filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    // Filter by date range
    if (startDate && endDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.date >= startDate && transaction.date <= endDate
      );
    }

    // Filter by customer name
    if (customerName) {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.customerName.toLowerCase() === customerName.toLowerCase()
      );
    }

    // Sort by date based on sortKey
    filteredTransactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Pagination logic
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    res.status(200).json({
      transactions: paginatedTransactions,
      total: filteredTransactions.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'failed to load data' });
  }
}

const fetchTransactions = async () => {
  return [
    {
      date: '2025-01-23',
      customerName: 'Harper Robinson',
      description: 'Clothing Purchase',
      points: 25,
    },
    {
      date: '2025-01-23',
      customerName: 'Elijah Clark',
      description: 'Restaurant Bill',
      points: 35,
    },
    {
      date: '2025-01-25',
      customerName: 'Abigail Rodriguez',
      description: 'Movie Tickets',
      points: 15,
    },
    {
      date: '2025-01-26',
      customerName: 'Daniel Lewis',
      description: 'Gym Membership',
      points: 40,
    },
    {
      date: '2025-01-27',
      customerName: 'Sofia Lee',
      description: 'Book Purchase',
      points: 20,
    },
    {
      date: '2024-12-01',
      customerName: 'John Doe',
      description: 'Coffee Purchase',
      points: 10,
    },
    {
      date: '2024-11-30',
      customerName: 'Emma Davis',
      description: 'Dinner Special',
      points: 30,
    },
    {
      date: '2024-11-28',
      customerName: 'Jane Smith',
      description: 'Bakery Item',
      points: 15,
    },
    {
      date: '2024-11-27',
      customerName: 'Michael Green',
      description: 'Grocery Shopping',
      points: 45,
    },
    {
      date: '2024-11-25',
      customerName: 'Sophia Carter',
      description: 'Fuel Purchase',
      points: 20,
    },
    {
      date: '2024-11-23',
      customerName: 'Liam Brown',
      description: 'Electronics Purchase',
      points: 50,
    },
    {
      date: '2024-11-24',
      customerName: 'Olivia Wilson',
      description: 'Clothing Purchase',
      points: 25,
    },
    {
      date: '2024-11-25',
      customerName: 'Noah Johnson',
      description: 'Restaurant Bill',
      points: 35,
    },
    {
      date: '2024-11-21',
      customerName: 'Ava Martinez',
      description: 'Movie Tickets',
      points: 15,
    },
    {
      date: '2024-11-20',
      customerName: 'William Anderson',
      description: 'Gym Membership',
      points: 40,
    },
    {
      date: '2024-11-19',
      customerName: 'Isabella Thomas',
      description: 'Book Purchase',
      points: 20,
    },
    {
      date: '2024-11-18',
      customerName: 'James Taylor',
      description: 'Grocery Shopping',
      points: 50,
    },
    {
      date: '2024-11-17',
      customerName: 'Mia Moore',
      description: 'Pet Supplies',
      points: 30,
    },
    {
      date: '2024-11-16',
      customerName: 'Benjamin Jackson',
      description: 'Home Decor',
      points: 25,
    },
    {
      date: '2024-11-15',
      customerName: 'Charlotte White',
      description: 'Coffee Purchase',
      points: 10,
    },
    {
      date: '2024-11-14',
      customerName: 'Lucas Harris',
      description: 'Dinner Special',
      points: 30,
    },
    {
      date: '2024-11-13',
      customerName: 'Amelia Martin',
      description: 'Bakery Item',
      points: 15,
    },
    {
      date: '2024-11-12',
      customerName: 'Henry Thompson',
      description: 'Grocery Shopping',
      points: 45,
    },
    {
      date: '2024-11-11',
      customerName: 'Evelyn Garcia',
      description: 'Fuel Purchase',
      points: 20,
    },
    {
      date: '2024-11-10',
      customerName: 'Alexander Martinez',
      description: 'Electronics Purchase',
      points: 50,
    },
  ];
};
