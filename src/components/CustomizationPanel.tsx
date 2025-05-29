import React from 'react';
import { Sliders, CheckCircle } from 'lucide-react';

interface CustomizationPanelProps {
  customization: {
    fgColor: string;
    bgColor: string;
    size: number;
    includeMargin: boolean;
    level: 'L' | 'M' | 'Q' | 'H';
  };
  onChange: (
    key: keyof typeof customization,
    value: string | number | boolean | 'L' | 'M' | 'Q' | 'H'
  ) => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  customization,
  onChange,
}) => {
  const errorCorrectionLevels = [
    { value: 'L', label: 'Low (7%)' },
    { value: 'M', label: 'Medium (15%)' },
    { value: 'Q', label: 'Quartile (25%)' },
    { value: 'H', label: 'High (30%)' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="flex items-center mb-4">
        <Sliders size={20} className="mr-2 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Customize QR Code
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Foreground Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={customization.fgColor}
              onChange={(e) => onChange('fgColor', e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600 mr-2"
            />
            <input
              type="text"
              value={customization.fgColor}
              onChange={(e) => onChange('fgColor', e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background Color
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={customization.bgColor}
              onChange={(e) => onChange('bgColor', e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600 mr-2"
            />
            <input
              type="text"
              value={customization.bgColor}
              onChange={(e) => onChange('bgColor', e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Size: {customization.size}px
          </label>
          <input
            type="range"
            min="100"
            max="400"
            step="10"
            value={customization.size}
            onChange={(e) => onChange('size', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Error Correction Level
          </label>
          <div className="grid grid-cols-2 gap-2">
            {errorCorrectionLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => onChange('level', level.value as 'L' | 'M' | 'Q' | 'H')}
                className={`px-3 py-2 rounded-md text-sm ${
                  customization.level === level.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                } transition-colors duration-200`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => onChange('includeMargin', !customization.includeMargin)}
            className="flex items-center px-3 py-2 rounded-md text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200"
          >
            <CheckCircle
              size={18}
              className={`mr-2 ${
                customization.includeMargin
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            />
            Include Margin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;