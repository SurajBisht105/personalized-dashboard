// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import PersonalizedFeed from '@/components/sections/PersonalizedFeed';
// import contentReducer from '@/store/slices/contentSlice';
// import preferencesReducer from '@/store/slices/preferencesSlice';
// import { http, HttpResponse } from 'msw';
// import { setupServer } from 'msw/node';

// // Mock API responses
// const server = setupServer(
//   http.get('/api/content', () => {
//     return HttpResponse.json({
//       items: [
//         {
//           id: '1',
//           type: 'news',
//           title: 'Test News Article',
//           description: 'Test description',
//           url: 'https://example.com',
//           category: 'technology',
//           timestamp: new Date().toISOString(),
//           source: 'Test Source',
//         },
//       ],
//       page: 1,
//       hasMore: true,
//       total: 50,
//     });
//   })
// );

// before(() => server.listen());
// afterEach(() => server.resetHandlers());
// after(() => server.close());

// describe('PersonalizedFeed Integration', () => {
//   const createTestStore = () =>
//     configureStore({
//       reducer: {
//         content: contentReducer,
//         preferences: preferencesReducer,
//       },
//     });

//   it('should fetch and display content on mount', async () => {
//     const store = createTestStore();

//     render(
//       <Provider store={store}>
//         <PersonalizedFeed />
//       </Provider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Test News Article')).toBeInTheDocument();
//     });
//   });

//   it('should handle drag and drop reordering', async () => {
//     const store = createTestStore();

//     render(
//       <Provider store={store}>
//         <PersonalizedFeed />
//       </Provider>
//     );

//     await waitFor(() => {
//       const cards = screen.getAllByTestId('content-card');
//       expect(cards).toHaveLength(1);
//     });

//     // Simulate drag and drop
//     const firstCard = screen.getAllByTestId('content-card')[0];
//     fireEvent.dragStart(firstCard);
//     fireEvent.dragEnd(firstCard);

//     // Verify state update
//     const state = store.getState();
//     expect(state.content.sortOrder).toBeDefined();
//   });

//   it('should handle infinite scroll', async () => {
//     const store = createTestStore();

//     render(
//       <Provider store={store}>
//         <PersonalizedFeed />
//       </Provider>
//     );

//     // Simulate scroll to bottom
//     const scrollContainer = screen.getByTestId('scroll-container');
//     fireEvent.scroll(scrollContainer, {
//       target: { scrollY: 1000 },
//     });

//     await waitFor(() => {
//       const state = store.getState();
//       expect(state.content.page).greaterThan(1);
//     });
//   });

//   it('should filter content based on preferences', async () => {
//     const store = createTestStore();

//     // Set preferences
//     store.dispatch({
//       type: 'preferences/setCategories',
//       payload: ['technology', 'sports'],
//     });

//     render(
//       <Provider store={store}>
//         <PersonalizedFeed />
//       </Provider>
//     );

//     await waitFor(() => {
//       const state = store.getState();
//       expect(state.content.items.every(item => 
//         ['technology', 'sports'].includes(item.category)
//       )).toBe(true);
//     });
//   });
// });
