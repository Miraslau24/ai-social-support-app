import type { Status } from '../../../types/status.type.ts';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAiSuggestion } from './aiSuggestionThunk';

const initialState = {
  error: null as string | null,
  status: 'idle' as Status,
  suggestion: null as string | null,
};

const aiSuggestionSlice = createSlice({
  name: 'aiSuggestion',
  initialState,
  reducers: {
    clearAiSuggestion: (state) => {
      state.status = 'idle';
      state.error = null;
      state.suggestion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiSuggestion.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.suggestion = null;
      })
      .addCase(fetchAiSuggestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suggestion = action.payload.suggestion;
      })
      .addCase(fetchAiSuggestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearAiSuggestion } = aiSuggestionSlice.actions;
export default aiSuggestionSlice.reducer;
