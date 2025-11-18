import type { InputConfig } from '../types/inputConfig.ts';

const personalInfoInputs: InputConfig[] = [
  {
    label: 'Name',
    type: 'text',
    model: 'name',
    format: 'string',
    autofocus: true,
    required: true,
    placeholder: 'Alex Smith',
    autoComplete: 'off',
  },
  {
    label: 'National ID',
    type: 'text',
    format: 'national-id',
    model: 'nationalId',
    autofocus: false,
    required: true,
    placeholder: '784-1979-12345-67-1',
    autoComplete: 'off',
  },
  {
    label: 'Date of Birth',
    type: 'date',
    model: 'dateOfBirth',
    format: 'date',
    spaceDirection: 'vertical',
    autofocus: false,
    required: true,
    placeholder: '29/09/2004',
    autoComplete: 'off',
    validation: {
      type: 'age',
      minAge: 18,
    },
    disabledDate: (current) => {
      const eighteenAgeDate = new Date();
      eighteenAgeDate.setFullYear(eighteenAgeDate.getFullYear() - 18);
      eighteenAgeDate.setHours(23, 59, 59, 999);

      return current && current.toDate() > eighteenAgeDate;
    },
  },
  {
    label: 'Gender',
    type: 'select',
    model: 'gender',
    autofocus: false,
    required: true,
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
    ],
    placeholder: 'Male',
    autoComplete: 'off',
    clearable: false,
  },
  {
    label: 'Country',
    type: 'text',
    model: 'country',
    format: 'string',
    autofocus: false,
    required: true,
    placeholder: 'United Arab Emirates',
    autoComplete: 'off',
  },
  {
    label: 'State',
    type: 'text',
    model: 'state',
    format: 'string',
    autofocus: false,
    required: true,
    placeholder: 'Abu Dhabi',
    autoComplete: 'off',
  },
  {
    label: 'City',
    type: 'text',
    model: 'city',
    format: 'string',
    autofocus: false,
    required: true,
    placeholder: 'Abu Dhabi',
    autoComplete: 'off',
  },
  {
    label: 'Address',
    type: 'text',
    model: 'address',
    format: 'string',
    autofocus: false,
    required: true,
    placeholder: '902, Sultan Bin Zayed The First Street',
    autoComplete: 'off',
  },
  {
    label: 'Phone',
    type: 'text',
    model: 'phone',
    format: 'phone',
    autofocus: false,
    required: true,
    placeholder: '+971501234567',
    autoComplete: 'off',
  },
  {
    label: 'Email',
    type: 'text',
    model: 'email',
    format: 'email',
    autofocus: false,
    required: true,
    placeholder: 'email@example.com',
    autoComplete: 'off',
  },
];

export default personalInfoInputs;
