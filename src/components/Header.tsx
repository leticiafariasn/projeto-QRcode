import React from 'react';
import { QrCode, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <QrCode size={32} className="text-purple-600 dark:text-purple-400 mr-2" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            QR Code Generator
          </h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun size={24} className="text-yellow-400" />
          ) : (
            <Moon size={24} className="text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;