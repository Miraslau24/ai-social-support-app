import type { PersonalInfo } from '../../../types/personalInfo.interface.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: PersonalInfo = {
  name: '',
  nationalId: '',
  dateOfBirth: null,
  gender: null,
  address: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  email: '',
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      Object.assign(state, action.payload);
    },
    resetPersonalInfo: () => initialState,
  },
});

export const { setPersonalInfo, resetPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
