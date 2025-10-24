import { DatePicker, type DatePickerProps } from 'antd';
import { type FC, useEffect } from 'react';
import type { InputConfig } from '../../../types/inputConfig.ts';
import dayjs from 'dayjs';

const APP_DATE_FORMAT = 'DD/MM/YYYY';

interface ControlledProps {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  name: string;
}

interface CustomDatePickerProps extends ControlledProps {
  input: InputConfig;
  defaultModel?: Record<string, any>;
  index: number;
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  input,
  value,
  onChange,
  onBlur,
  name,
}) => {
  const dayjsValue = value ? dayjs(value) : null;

  const handleDatePickerChange: DatePickerProps['onChange'] = (
    date: dayjs.Dayjs | null
  ) => {
    onChange(date ? date.toDate() : null);
  };

  useEffect(() => {
    if (dayjsValue) {
      onChange(dayjsValue.toDate());
    }
  }, []);

  return (
    <DatePicker
      style={{ width: '100%' }}
      value={dayjsValue}
      onChange={handleDatePickerChange}
      onBlur={onBlur}
      name={name}
      autoFocus={input.autofocus}
      placeholder={input.placeholder}
      format={APP_DATE_FORMAT}
      inputReadOnly={true}
    />
  );
};

export default CustomDatePicker;
