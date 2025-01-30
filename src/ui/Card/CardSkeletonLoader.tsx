import Card from '.';

export default function CardSkeleton() {
  return (
    <Card
      title={<span className="h-6 w-52 rounded bg-gray-100 inline-block"></span>}
      content={<span className="h-5 w-24 rounded bg-gray-100 inline-block"></span>}
    />
  );
}
