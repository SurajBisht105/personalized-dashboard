import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentCard from '@/components/content/ContentCard';
import favoritesReducer from '@/store/slices/favoritesSlice';
import { ContentItem } from '@/types';

const mockItem: ContentItem = {
  id: '1',
  type: 'news',
  title: 'Test Article',
  description: 'Test description',
  imageUrl: 'https://example.com/image.jpg',
  url: 'https://example.com',
  category: 'technology',
  timestamp: new Date(),
  source: 'Test Source',
};

const createMockStore = () =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  });

describe('ContentCard', () => {
  it('renders content correctly', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
  });

  it('toggles favorite on click', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);

    // Check if the item was added to favorites
    const state = store.getState();
    expect(state.favorites.items).toContainEqual(mockItem);
  });

  it('displays correct type badge color', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <ContentCard item={mockItem} />
      </Provider>
    );

    const typeBadge = screen.getByText('news');
    expect(typeBadge).toHaveClass('bg-blue-100');
  });
});