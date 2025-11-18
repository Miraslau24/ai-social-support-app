import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_MODEL,
  API_TIMEOUT_MS,
  API_URL,
} from '../../../constants/aiAPI.ts';

const API_KEY = import.meta.env.VITE_OPEN_AI_KEY as string;

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

      const response = await fetch(API_URL, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept-Language': 'en, ar;q=0.9',
        },
        body: JSON.stringify({
          model: API_MODEL,
          messages: messages,
          temperature: 1.0,
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `API Error: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          const nestedMessage = errorJson?.error?.message;

          if (nestedMessage) {
            errorMessage = `API Error ${response.status}: ${nestedMessage}`;
          } else {
            errorMessage = `API Error ${response.status}: ${errorText}`;
          }
        } catch (_) {
          errorMessage = `API Error ${response.status}: ${errorText}`;
        }
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
