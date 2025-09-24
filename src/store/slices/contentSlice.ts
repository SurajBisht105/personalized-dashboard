import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '@/types';
import axios from 'axios';

interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  searchQuery: string;
  sortOrder: string[];
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
  searchQuery: '',
  sortOrder: [],
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ page, categories, query }: { page: number; categories: string[]; query?: string }) => {
    const response = await axios.get('/api/content', {
      params: { page, categories: categories.join(','), q: query }
    });
    return response.data;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.items = [];
      state.page = 1;
    },
    reorderContent: (state, action: PayloadAction<string[]>) => {
      state.sortOrder = action.payload;
      const orderedItems = action.payload.map(id => 
        state.items.find(item => item.id === id)
      ).filter(Boolean) as ContentItem[];
      const unorderedItems = state.items.filter(
        item => !action.payload.includes(item.id)
      );
      state.items = [...orderedItems, ...unorderedItems];
    },
    clearContent: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.items = action.payload.items;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }
        state.hasMore = action.payload.hasMore;
        state.page = action.payload.page;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      });
  },
});

export const { setSearchQuery, reorderContent, clearContent } = contentSlice.actions;
export default contentSlice.reducer;