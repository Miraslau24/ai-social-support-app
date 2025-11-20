import { useForm, Controller, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'antd';
import {
  type ElementType,
  type FC,
  type RefObject,
  useImperativeHandle,
  useMemo,
} from 'react';
import TextInput from './text-input/text-input.tsx';
import { useTranslation } from 'react-i18next';
import type { InputConfig } from '../../types/inputConfig.ts';
import DatePicker from './date-picker/date-picker.tsx';
import SelectInput from './select-input/select-input.tsx';
import type { CustomFormHandle } from '../../types/customFormHandle.ts';
import createValidationSchema from '../../utils/validationSchema.ts';
import TextareaInput from './textArea-input/textarea-input.tsx';

interface CustomFormProps {
  inputs: InputConfig[];
  className?: string;
  defaultModel: Record<string, any>;
  ref: RefObject<CustomFormHandle | null>;
  onFormSubmit: (data: Record<string, any>) => void;
  onSavePartial?: (data: Record<string, any>) => void;
  title?: string;
  isMobile?: boolean;
  onHelpMeWriteClick?: (model: string) => void;
}

const COMPONENT_MAP: Record<string, ElementType> = {
  text: TextInput,
  date: DatePicker,
  select: SelectInput,
  textarea: TextareaInput,
};

const CustomForm: FC<CustomFormProps> = ({
  inputs,
  className,
  defaultModel,
  onFormSubmit,
  onSavePartial,
  ref,
  title,
  isMobile = false,
  onHelpMeWriteClick,
}) => {
  const { t } = useTranslation();
  const validationSchema = useMemo(
    () => createValidationSchema(inputs, t),
    [inputs, t]
  );

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultModel,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onInvalid = (validationErrors: FieldErrors) => {
    console.error('Validation Failed:', validationErrors);
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onFormSubmit, onInvalid),
    setFieldValue: (name: string, value: any) => {
      setValue(name, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  }));

  return (
    <Form className={className} layout="vertical">
      {inputs.map((inputConfig, index) => {
        const fieldError = errors[inputConfig.model];
        const inputType = inputConfig.type || 'text';
        const ComponentToRender = COMPONENT_MAP[inputType] || TextInput;

        return (
          <Form.Item
            key={inputConfig.model}
            label={t(`multi-step.${title}.${inputConfig.model}`)}
            name={inputConfig.model}
            validateStatus={fieldError ? 'error' : ''}
            help={fieldError ? (fieldError.message as string) : ''}
            className={`${!isMobile && inputConfig?.className}`}
          >
            <Controller
              name={inputConfig.model}
              control={control}
              render={({ field }) => (
                <ComponentToRender
                  {...field}
                  onBlur={() => {
                    field.onBlur();

                    if (onSavePartial) {
                      const currentData = getValues();
                      onSavePartial(currentData)
                    }
                  }}
                  index={index}
                  input={inputConfig}
                  defaultModel={defaultModel}
                  onHelpMeWriteClick={onHelpMeWriteClick}
                />
              )}
            />
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default CustomForm;
