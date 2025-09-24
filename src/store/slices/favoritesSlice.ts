import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '@/types';

interface FavoritesState {
  items: ContentItem[];
  lastUpdated: string | null;
}

const initialState: FavoritesState = {
  items: [],
  lastUpdated: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ContentItem>) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push({ ...action.payload, isFavorite: true });
      }
      state.lastUpdated = new Date().toISOString();
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.lastUpdated = new Date().toISOString();
    },
    clearFavorites: (state) => {
      state.items = [];
      state.lastUpdated = new Date().toISOString();
    },
    reorderFavorites: (state, action: PayloadAction<string[]>) => {
      const orderedItems = action.payload.map(id => 
        state.items.find(item => item.id === id)
      ).filter(Boolean) as ContentItem[];
      state.items = orderedItems;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { 
  toggleFavorite, 
  removeFavorite, 
  clearFavorites,
  reorderFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;