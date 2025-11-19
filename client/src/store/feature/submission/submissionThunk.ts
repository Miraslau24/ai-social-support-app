import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store.ts';

const API_URL = import.meta.env.VITE_SERVER_API as string;
const SERVER_URL=`${API_URL}/api/v1/application`;

export const submitFinalForm = createAsyncThunk('submission/submitFinalForm', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;

    const applicationData = {
      personalInfo: state.personalInfo,
      familyFinancialInfo: state.familyFinancialInfo,
      situationDescription: state.situationDescription,
    };

    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    return await response.json();

  } catch (error) {
    return rejectWithValue(error.message);
  }
})