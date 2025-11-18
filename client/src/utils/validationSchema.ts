import type { InputConfig } from '../types/inputConfig.ts';
import type { TFunction } from 'i18next';
import {
  z,
  type ZodDate,
  type ZodNullable,
  type ZodNumber,
  type ZodString,
} from 'zod';

type ZodType = ZodNumber | ZodString | ZodDate | ZodNullable;

const createValidationSchema = (inputs: InputConfig[], t: TFunction) => {
  const schemaShape = inputs.reduce(
    (accumulator, input) => {
      let fieldSchema: ZodType;
      const requiredMessage = t('multi-step.error.required');

      switch (input.type) {
        case 'date':
          fieldSchema = z.date({
            error: t('multi-step.error.date'),
          });
          break;
        case 'textarea':
        case 'select':
        case 'text':
        default:
          switch (input.format) {
            case 'phone':
              fieldSchema = z
                .string()
                .regex(/^\+?\d+$/, t('multi-step.error.invalid_phone'));
              break;
            case 'email':
              fieldSchema = z.string().email({
                message: t('multi-step.error.invalid_email'),
              });
              break;
            case 'national-id':
              fieldSchema = z
                .string()
                .regex(
                  /^\d{3}-\d{4}-\d{5}-\d{2}-\d{1}$/,
                  t('multi-step.error.national_id_format')
                );
              break;
            default:
              fieldSchema = z.string({
                error: t('multi-step.error.required'),
              });
              break;
          }
          break;
      }

      if (input.required) {
        if (fieldSchema instanceof z.ZodString) {
          fieldSchema = fieldSchema.min(1, requiredMessage);
        }
      } else {
        fieldSchema = fieldSchema.optional().nullable();
      }

      accumulator[input.model] = fieldSchema;
      return accumulator;
    },
    {} as Record<string, ZodType>
  );

  return z.object(schemaShape);
};

export default createValidationSchema;
