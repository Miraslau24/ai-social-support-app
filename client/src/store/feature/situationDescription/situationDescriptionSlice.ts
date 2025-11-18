import type { SituationDescription } from '../../../types/situationDescription.interface.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: SituationDescription = {
  currentFinancialSituation: '',
  employmentCircumstances: '',
  reasonForApplying: '',
};

const situationDescriptionSlice = createSlice({
  name: 'situationDescription',
  initialState,
  reducers: {
    setSituationDescription: (
      state,
      action: PayloadAction<Partial<SituationDescription>>
    ) => {
      Object.assign(state, action.payload);
    },
    resetSituationDescription: () => initialState,
  },
});

export const { setSituationDescription, resetSituationDescription } =
  situationDescriptionSlice.actions;
export default situationDescriptionSlice.reducer;
