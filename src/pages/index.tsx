import { GetStaticProps } from 'next';
import { BusinessData } from './api/business';
import MetricsSummary from '@/ui/MetricsSummary';
import RecentTransactions from '@/ui/RecentTransactions';
import Charts from '@/ui/Charts';

export default function Home(initalBusinessData: BusinessData) {
  return (
    <>
      <MetricsSummary initialData={initalBusinessData} />
      <RecentTransactions />
      <Charts />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business`);
  let data;
  if (res.ok) {
    data = (await res.json()) as BusinessData;
  }

  return {
    props: data ?? {},
  };
};
