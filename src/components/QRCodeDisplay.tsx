import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeDisplayProps {
  value: string;
  customization: {
    fgColor: string;
    bgColor: string;
    size: number;
    includeMargin: boolean;
    level: 'L' | 'M' | 'Q' | 'H';
  };
  canGenerate: boolean;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  customization,
  canGenerate,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (format: 'png' | 'svg') => {
    if (!qrRef.current || !canGenerate) return;
    
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else if (format === 'svg') {
      // Create SVG data
      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${customization.size}" height="${customization.size}" viewBox="0 0 ${customization.size} ${customization.size}">
        <rect width="100%" height="100%" fill="${customization.bgColor}"/>
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${canvas.toDataURL('image/png')}
          </div>
        </foreignObject>
      </svg>`;
      
      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.svg`;
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      link.href = URL.createObjectURL(blob);
      link.click();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center w-full transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Your QR Code
      </h2>

      <div 
        ref={qrRef} 
        className={`mb-6 p-4 bg-white rounded-lg transition-all duration-300 ${canGenerate ? 'opacity-100' : 'opacity-50'}`}
        style={{ backgroundColor: customization.bgColor }}
      >
        {canGenerate ? (
          <QRCodeCanvas
            value={value}
            size={customization.size}
            bgColor={customization.bgColor}
            fgColor={customization.fgColor}
            level={customization.level}
            includeMargin={customization.includeMargin}
            className="animate-fade-in"
          />
        ) : (
          <div className="flex items-center justify-center" style={{ width: customization.size, height: customization.size }}>
            <p className="text-gray-400 text-center">
              Enter content to generate QR code
            </p>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => downloadQRCode('png')}
          disabled={!canGenerate}
          className={`flex items-center px-4 py-2 rounded-md ${
            canGenerate
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          } transition-colors duration-200`}
        >
          <Download size={18} className="mr-2" />
          PNG
        </button>
        <button
          onClick={() => downloadQRCode('svg')}
          disabled={!canGenerate}
          className={`flex items-center px-4 py-2 rounded-md ${
            canGenerate
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          } transition-colors duration-200`}
        >
          <Download size={18} className="mr-2" />
          SVG
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;