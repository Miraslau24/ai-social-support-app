import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_TIMEOUT_MS
} from '../../../constants/aiAPI.ts';

const API_URL = import.meta.env.VITE_SERVER_API as string;
const SERVER_URL=`${API_URL}/api/v1/ai/generate`;

export const fetchAiSuggestion = createAsyncThunk(
  'submission/fetchAiSuggestion',
  async (
    { translatedPrompt }: { translatedPrompt: string },
    { _, rejectWithValue }
  ) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
      const messages = [{ role: 'user', content: translatedPrompt }];

      const response = await fetch(SERVER_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages,
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `Server Error: ${response.status}`;
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      console.log('data: ', data);
      const suggestionText = data.choices[0]?.message?.content;

      if (!suggestionText) {
        return rejectWithValue('Failed to parse AI response.');
      }

      return { suggestion: suggestionText };
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        return rejectWithValue('Request timed out after 3.5 minutes.');
      }

      return rejectWithValue(
        error.message || 'An unknown network error occurred.'
      );
    }
  }
);
