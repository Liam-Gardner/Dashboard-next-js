import { getBusinessData, getBusinessDataKey } from '@/services/getBusinessData';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import CardSkeleton from './Card/CardSkeletonLoader';

export default function MetricsSummary() {
  const { data, isError, isPending } = useQuery({
    queryKey: [getBusinessDataKey],
    queryFn: getBusinessData,
  });

  if (isError) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <Card title="Total Active Customers" content={'-'} />
        <Card title="Total Points Issued" content={'-'} />
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <Card title="Total Active Customers" content={data?.totalCustomers} />
      <Card title="Total Points Issued" content={data?.pointsIssued} />
    </div>
  );
}
