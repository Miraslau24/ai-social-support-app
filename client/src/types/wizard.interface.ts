export interface Wizard {
  currentStep: number;
  stepValidity: Record<number, boolean>;
}
