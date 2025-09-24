import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import preferencesReducer from './slices/preferencesSlice';
import favoritesReducer from './slices/favoritesSlice';
import { newsApi } from './api/newsApi';
import { recommendationsApi } from './api/recommendationsApi';
import { socialApi } from './api/socialApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['preferences', 'favorites', 'auth']
};

const persistedPreferencesReducer = persistReducer(persistConfig, preferencesReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    preferences: persistedPreferencesReducer,
    favorites: favoritesReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [recommendationsApi.reducerPath]: recommendationsApi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(newsApi.middleware)
      .concat(recommendationsApi.middleware)
      .concat(socialApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;