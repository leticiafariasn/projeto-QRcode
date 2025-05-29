import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center">
          Made with <Heart size={16} className="mx-1 text-red-500" /> using React &amp; Tailwind CSS
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          © {new Date().getFullYear()} QR Code Generator
        </p>
      </div>
    </footer>
  );
};

export default Footer;