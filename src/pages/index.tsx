import { GetStaticProps } from 'next';
import { BusinessData } from './api/business';
import MetricsSummary from '@/ui/MetricsSummary';
import RecentTransactions from '@/ui/RecentTransactions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Charts from '@/ui/Charts';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <MetricsSummary />
      <RecentTransactions />
      <Charts />
    </QueryClientProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/business');
  let data;
  if (res.ok) {
    data = (await res.json()) as BusinessData;
  }

  return {
    props: {
      businessName: data?.businessName ?? '',
    },
  };
};
