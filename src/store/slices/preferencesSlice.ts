import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '@/types';

const initialState: UserPreferences = {
  categories: ['technology', 'sports', 'finance'],
  darkMode: false,
  language: 'en',
  contentSources: {
    news: true,
    recommendations: true,
    social: true,
  },
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleContentSource: (state, action: PayloadAction<keyof typeof state.contentSources>) => {
      state.contentSources[action.payload] = !state.contentSources[action.payload];
    },
    resetPreferences: () => initialState,
  },
});

export const {
  setCategories,
  toggleDarkMode,
  setLanguage,
  toggleContentSource,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;