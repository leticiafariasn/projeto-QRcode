import React from 'react';
import { AlignLeft, Globe, User } from 'lucide-react';

interface InputFormProps {
  value: string;
  type: 'url' | 'text' | 'contact';
  onChange: (value: string, type: 'url' | 'text' | 'contact') => void;
  isValid: boolean;
  errorMessage: string;
}

const InputForm: React.FC<InputFormProps> = ({
  value,
  type,
  onChange,
  isValid,
  errorMessage,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value, type);
  };

  const handleTypeChange = (newType: 'url' | 'text' | 'contact') => {
    onChange(value, newType);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Create QR Code
      </h2>

      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md flex items-center ${
              type === 'url'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } transition-colors duration-200`}
            onClick={() => handleTypeChange('url')}
          >
            <Globe size={18} className="mr-2" />
            URL
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${
              type === 'text'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } transition-colors duration-200`}
            onClick={() => handleTypeChange('text')}
          >
            <AlignLeft size={18} className="mr-2" />
            Text
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center ${
              type === 'contact'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } transition-colors duration-200`}
            onClick={() => handleTypeChange('contact')}
          >
            <User size={18} className="mr-2" />
            Contact
          </button>
        </div>

        <div className="mt-4">
          <label
            htmlFor="qr-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {type === 'url'
              ? 'Enter URL'
              : type === 'text'
              ? 'Enter Text'
              : 'Enter Contact Info (Name, Email, Phone)'}
          </label>
          <textarea
            id="qr-input"
            rows={5}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
              !isValid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={
              type === 'url'
                ? 'https://example.com'
                : type === 'text'
                ? 'Enter your text here'
                : 'Name\nEmail\nPhone'
            }
            value={value}
            onChange={handleInputChange}
          />
          {!isValid && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}
          {type === 'url' && isValid && value && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              Valid URL format
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputForm;