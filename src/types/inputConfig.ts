export type InputConfig = {
  label?: string;
  type: string;
  model: string;
  placeholder: string;
  format?: string;
  required?: boolean;
  autofocus?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  spaceDirection?: 'vertical' | 'horizontal';
  clearable?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
  className?: string;
  rows?: number;
  aiHelper?: boolean;
};
