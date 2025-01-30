import type { JSX } from 'react';

type CardProps = { title: string | number | JSX.Element; content: string | number | JSX.Element };

export default function Card({ title, content }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700">
      <h2 className="text-lg font-semibold dark:text-gray-200">{title}</h2>
      <p className="text-2xl dark:text-gray-300">{content}</p>
    </div>
  );
}
