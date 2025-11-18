import type { FamilyFinancialInfo } from '../../../types/familyFinancialInfo.interface.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: FamilyFinancialInfo = {
  maritalStatus: null,
  dependents: 0,
  employmentStatus: null,
  monthlyIncome: 0,
  housingStatus: null,
};

const familyFinancialInfoSlice = createSlice({
  name: 'familyFinancialInfo',
  initialState,
  reducers: {
    setFamilyFinancialInfo: (
      state,
      action: PayloadAction<Partial<FamilyFinancialInfo>>
    ) => {
      Object.assign(state, action.payload);
    },
    resetFamilyFinancialInfo: () => initialState,
  },
});

export const { setFamilyFinancialInfo, resetFamilyFinancialInfo } =
  familyFinancialInfoSlice.actions;
export default familyFinancialInfoSlice.reducer;
