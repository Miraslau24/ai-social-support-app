import { Input } from 'antd';
import { type ChangeEvent, type FC, useEffect, useState } from 'react';
import type { InputConfig } from '../../../types/inputConfig.ts';
import applyNationalIdMask from '../../../utils/applyNationalIdMask.ts';

interface ControlledProps {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  name: string;
}

interface TextInputProps extends ControlledProps {
  input: InputConfig;
  defaultModel?: Record<string, any>;
  index: number;
}

const TextInput: FC<TextInputProps> = ({
  value,
  input,
  name,
  onBlur,
  onChange,
}) => {
  const [displayValue, setDisplayValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    if (input.format === 'number') {
      const numbersOnly = rawValue.replace(/\D/g, '');

      setDisplayValue(numbersOnly);
      onChange(numbersOnly);
    } else if (input.format === 'national-id') {
      const numbersOnly = rawValue.replace(/\D/g, '');

      if (numbersOnly.length > 15) {
        return;
      }

      const maskedValue = applyNationalIdMask(numbersOnly);

      setDisplayValue(maskedValue);
      onChange(maskedValue);
    } else {
      setDisplayValue(rawValue);
      onChange(rawValue);
    }
  };

  useEffect(() => {
    const initialValue = (value as string) || '';
    if (input.format === 'national-id') {
      const numbersOnly = initialValue.replace(/\D/g, '');
      setDisplayValue(applyNationalIdMask(numbersOnly));
    } else {
      setDisplayValue(initialValue);
    }
  }, [value, input.format]);

  return (
    <div className="relative">
      <Input
        type="text"
        name={name}
        value={displayValue}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={input.disabled}
        autoFocus={input.autofocus}
        placeholder={input.placeholder}
        autoComplete={input.autoComplete}
      />
    </div>
  );
};

export default TextInput;
