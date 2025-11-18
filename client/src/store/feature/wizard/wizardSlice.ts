import type { Wizard } from '../../../types/wizard.interface.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: Wizard = {
  currentStep: 0,
  stepValidity: { 0: false, 1: false, 2: false },
};

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setStepValidity: (
      state,
      action: PayloadAction<{ step: number; isValid: boolean }>
    ) => {
      state.stepValidity[action.payload.step] = action.payload.isValid;
    },
    resetWizard: () => initialState,
  },
});

export const { setStep, setStepValidity, resetWizard } = wizardSlice.actions;
export default wizardSlice.reducer;
