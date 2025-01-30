import WarningErrorIcon from '@/assets/icons/WarningIcon';

type ErrorCardProps = { handleTryAgain: () => void; disabled: boolean; errorMessage: string };
export default function ErrorCard({ disabled, errorMessage, handleTryAgain }: ErrorCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700" w-full h-64>
      <div className="flex">
        <WarningErrorIcon />
        <span className="ml-2">{errorMessage}</span>
      </div>
      <div>
        <button
          onClick={handleTryAgain}
          disabled={disabled}
          className="mt-6 bg-blue-600 text-white p-2 rounded hover:bg-gray-600 disabled:bg-customDisabled disabled:hover:bg-customDisabled disabled:text-gray-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
