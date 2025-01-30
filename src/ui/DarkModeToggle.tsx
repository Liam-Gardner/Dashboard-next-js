import { useDarkMode } from '@/providers/DarkModeProvider';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      <span>{isDarkMode ? '🌙' : '☀️'}</span>
    </button>
  );
}
