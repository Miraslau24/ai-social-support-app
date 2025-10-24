import type { InputConfig } from '../../../types/inputConfig.ts';
import type { FC } from 'react';
import { Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';

interface ControlledProps {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  name: string;
}

interface CustomTextAreaProps extends ControlledProps {
  input: InputConfig;
  defaultModel?: Record<string, any>;
  index: number;
  onHelpMeWriteClick?: (model: string) => void;
}

const TextareaInput: FC<CustomTextAreaProps> = ({
  input,
  value,
  onChange,
  onBlur,
  name,
  onHelpMeWriteClick,
}) => {
  const { t } = useTranslation();
  const handleHelpClick = () => {
    if (onHelpMeWriteClick) {
      onHelpMeWriteClick(input.model);
    }
  };

  return (
    <div className="relative w-full">
      <Input.TextArea
        style={{ width: '100%' }}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        placeholder={input.placeholder}
        autoFocus={input.autofocus}
        disabled={input.disabled}
        rows={input.rows || 4}
      />
      {input.aiHelper && onHelpMeWriteClick && (
        <Button
          type="dashed"
          size="middle"
          onClick={handleHelpClick}
          className="mb-2 ml-2 absolute top-2 right-2 z-10 opacity-70 hover:opacity-100"
        >
          {t('multi-step.help')}
        </Button>
      )}
    </div>
  );
};

export default TextareaInput;
