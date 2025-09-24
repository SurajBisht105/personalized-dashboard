'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {  clearFavorites } from '@/store/slices/favoritesSlice';
import ContentCard from '@/components/content/ContentCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearAll = () => {
    dispatch(clearFavorites());
    setShowConfirmClear(false);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <span className="text-3xl mr-3">❤️</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Favorites
            </h1>
          </div>
          
          {favorites.length > 0 && (
            <button
              onClick={() => setShowConfirmClear(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors"
            >
              <span className="mr-2">🗑️</span>
              Clear All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <span className="text-6xl mb-4 block">💔</span>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Start adding content you love to see it here!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {favorites.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ContentCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Confirm Clear Dialog */}
        {showConfirmClear && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Clear all favorites?
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                This action cannot be undone. All your favorite items will be removed.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}