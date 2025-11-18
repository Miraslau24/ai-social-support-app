import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import personalInfoReducer from './feature/personalInfo/personalInfoSlice.ts';
import wizardReducer from './feature/wizard/wizardSlice.ts';
import FamilyFinancialInfoReducer from './feature/familyFinancialInfo/familyFinancialInfoSlice.ts';
import SituationDescriptionReducer from './feature/situationDescription/situationDescriptionSlice.ts';
import aiSuggestionReducer from './feature/aiSuggestion/aiSuggestionSlice.ts';

// @ts-ignore
const isDev: boolean = import.meta.env.DEV;

const appReducer = combineReducers({
  personalInfo: personalInfoReducer,
  wizard: wizardReducer,
  familyFinancialInfo: FamilyFinancialInfoReducer,
  situationDescription: SituationDescriptionReducer,
  aiSuggestion: aiSuggestionReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'personalInfo',
    'familyFinancialInfo',
    'situationDescription',
    'wizard',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: isDev,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };

export type AppDispatch = typeof store.dispatch;
