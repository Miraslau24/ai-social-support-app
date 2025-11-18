import type { InputConfig } from '../types/inputConfig.ts';

const familyFinancialInfoInputs: InputConfig[] = [
  {
    label: 'Marital Status',
    type: 'select',
    model: 'maritalStatus',
    autofocus: true,
    required: true,
    options: [
      {
        value: 'single',
        label: 'Single',
      },
      {
        value: 'married',
        label: 'Married',
      },
      {
        value: 'divorced',
        label: 'Divorced',
      },
      {
        value: 'widowed',
        label: 'Widowed',
      },
    ],
    placeholder: 'Single',
    autoComplete: 'off',
    clearable: false,
  },
  {
    label: 'Dependents',
    type: 'text',
    model: 'dependents',
    format: 'number',
    autofocus: false,
    required: true,
    placeholder: '20',
    autoComplete: 'off',
  },
  {
    label: 'Employment Status',
    type: 'select',
    model: 'employmentStatus',
    autofocus: false,
    required: true,
    options: [
      {
        value: 'employed',
        label: 'Employed',
      },
      {
        value: 'unemployed',
        label: 'Unemployed',
      },
      {
        value: 'self-employed',
        label: 'Self-Employed',
      },
      {
        value: 'retired',
        label: 'Retired',
      },
    ],
    placeholder: 'Employed',
    autoComplete: 'off',
    clearable: false,
  },
  {
    label: 'Monthly Income',
    type: 'text',
    model: 'monthlyIncome',
    format: 'number',
    autofocus: false,
    required: true,
    placeholder: '45',
    autoComplete: 'off',
  },
  {
    label: 'Housing Status',
    type: 'select',
    model: 'housingStatus',
    autofocus: false,
    required: true,
    options: [
      {
        value: 'owned',
        label: 'Owned',
      },
      {
        value: 'rented',
        label: 'Rented',
      },
      {
        value: 'living_with_family',
        label: 'Living With Family',
      },
      {
        value: 'homeless',
        label: 'Homeless',
      },
    ],
    placeholder: 'Owned',
    autoComplete: 'off',
    clearable: false,
    className: 'col-span-2',
  },
];

export default familyFinancialInfoInputs;
