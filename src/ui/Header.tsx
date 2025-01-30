import DarkModeToggle from './DarkModeToggle';

type Props = {
  businessName: string;
};

export default function Header({ businessName }: Props) {
  return (
    <header className="bg-blue-600 text-white p-4 dark:bg-gray-800">
      <div className="flex justify-between ">
        <div className="flex items-center ">
          {/* Logo placeholder */}
          <div className="w-[48px] h-[48px] bg-gray-300 rounded-full mr-4" />
          <h1 className="text-2xl font-bold">Welcome, {businessName}!</h1>
        </div>
        <div className="flex items-center gap-4">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
