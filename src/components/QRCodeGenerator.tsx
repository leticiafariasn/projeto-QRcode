import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import QRCodeDisplay from './QRCodeDisplay';
import CustomizationPanel from './CustomizationPanel';
import { validateInput } from '../utils/validation';

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'url' | 'text' | 'contact'>('url');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [customization, setCustomization] = useState({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    size: 200,
    includeMargin: true,
    level: 'M' as 'L' | 'M' | 'Q' | 'H',
  });

  const handleInputChange = (value: string, type: 'url' | 'text' | 'contact') => {
    setInputValue(value);
    setInputType(type);
  };

  useEffect(() => {
    if (inputType === 'url' && inputValue) {
      const { isValid, message } = validateInput(inputValue, inputType);
      setIsValid(isValid);
      setErrorMessage(message);
    } else {
      setIsValid(true);
      setErrorMessage('');
    }
  }, [inputValue, inputType]);

  const handleCustomizationChange = (
    key: keyof typeof customization, 
    value: string | number | boolean | 'L' | 'M' | 'Q' | 'H'
  ) => {
    setCustomization((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const canGenerateQR = inputValue.trim().length > 0 && (inputType !== 'url' || isValid);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-6">
          <InputForm 
            value={inputValue}
            type={inputType}
            onChange={handleInputChange}
            isValid={isValid}
            errorMessage={errorMessage}
          />
          <CustomizationPanel 
            customization={customization}
            onChange={handleCustomizationChange}
          />
        </div>
        
        <div className="flex flex-col items-center">
          <QRCodeDisplay 
            value={inputValue}
            customization={customization}
            canGenerate={canGenerateQR}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;