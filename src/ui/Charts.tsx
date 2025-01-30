import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useDarkMode } from '@/providers/DarkModeProvider';
import { getTransactions, getTransactionsKey } from '@/services/getTransactions';
import { useEffect, useMemo, useState } from 'react';
import { getSevenDaysAgoDate, getTodayDate } from '@/utils/dates/helpers';
import ErrorCard from './Error/ErrorCard';
Chart.register(...registerables);

export default function Charts() {
  const { isDarkMode } = useDarkMode();

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const queryClient = useQueryClient();

  const { data, isError, isPending } = useQuery({
    queryKey: [getTransactionsKey, startDate, endDate, 50],
    queryFn: () =>
      getTransactions({
        startDate,
        endDate,
        limit: 50,
      }),
    enabled: !!startDate && !!endDate,
  });

  const handleTryAgain = () => {
    queryClient.invalidateQueries({
      queryKey: [getTransactionsKey, startDate, endDate, 50],
    });
  };

  useEffect(() => {
    const today = getTodayDate();
    const sevenDaysAgo = getSevenDaysAgoDate();
    setStartDate(sevenDaysAgo);
    setEndDate(today);
  }, []);

  const totalPointsPerDay = useMemo(() => {
    return data?.transactions.reduce((acc, cur) => {
      if (!acc[cur.date]) {
        acc[cur.date] = cur.points;
      } else {
        acc[cur.date] += cur.points;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [data]);

  const categories = useMemo(() => {
    return data?.transactions.reduce((acc, transaction) => {
      if (Object.keys(acc).length !== 5) {
        if (!acc[transaction.description]) {
          acc[transaction.description] = transaction.points;
        } else {
          acc[transaction.description] += transaction.points;
        }
      }
      return acc;
    }, {} as Record<string, number>);
  }, [data]);

  if (isPending) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-8">
        <ErrorCard
          disabled={isPending}
          errorMessage="No recent transactions found"
          handleTryAgain={handleTryAgain}
        />
      </div>
    );
  }

  const pointsOverTimeData = {
    labels: Object.keys(totalPointsPerDay || {}),
    datasets: [
      {
        label: 'Points Issued',
        data: Object.values(totalPointsPerDay || {}),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const categoryDistributionData = {
    labels: Object.keys(categories || {}),
    datasets: [
      {
        label: 'Points Distribution',
        data: Object.values(categories || {}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      },
      title: {
        display: true,
        color: isDarkMode ? '#ffffff' : '#000000',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#000000',
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        <h2 className="text-lg font-semibold mb-4">Points Issued Over Last 7 Days</h2>
        <Bar data={pointsOverTimeData} options={options} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        <h2 className="text-lg font-semibold mb-4">Points Distribution By Last 5 Categories</h2>
        <Pie data={categoryDistributionData} options={options} />
      </div>
    </div>
  );
}

const ChartSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        <h2 className="text-lg font-semibold mb-4">Points Issued Over Last 7 Days</h2>
        <div style={{ height: '696px', width: '696px' }} className="bg-gray-100" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
        <h2 className="text-lg font-semibold mb-4">Points Distribution By Last 5 Categories</h2>
        <div style={{ height: '696px', width: '696px' }} className="bg-gray-100" />
      </div>
    </div>
  );
};
