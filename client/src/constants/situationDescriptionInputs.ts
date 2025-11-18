import type { InputConfig } from '../types/inputConfig.ts';

const situationDescriptionInputs: InputConfig[] = [
  {
    label: 'Current Financial Situation',
    type: 'textarea',
    autofocus: true,
    required: true,
    placeholder: '',
    autoComplete: 'off',
    model: 'currentFinancialSituation',
    aiHelper: true,
  },
  {
    label: 'Employment Circumstances',
    type: 'textarea',
    autofocus: false,
    required: true,
    placeholder: '',
    autoComplete: 'off',
    model: 'employmentCircumstances',
    aiHelper: true,
  },
  {
    label: 'Reason for Applying',
    type: 'textarea',
    autofocus: false,
    required: true,
    placeholder: '',
    autoComplete: 'off',
    model: 'reasonForApplying',
    aiHelper: true,
  },
];

export default situationDescriptionInputs;
