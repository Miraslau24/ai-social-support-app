import { Select } from 'antd';
import { type FC } from 'react';
import type { InputConfig } from '../../../types/inputConfig.ts';

interface ControlledProps {
  value: string | null;
  onChange: (value: any) => void;
  onBlur: () => void;
  name: string;
}

interface CustomSelectInputProps extends ControlledProps {
  input: InputConfig;
  defaultModel?: Record<string, any>;
  index: number;
}

const SelectInput: FC<CustomSelectInputProps> = ({
  input,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <Select
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      options={input.options}
      placeholder={input.placeholder}
      autoFocus={input.autofocus}
      allowClear={input.clearable}
    />
  );
};

export default SelectInput;
