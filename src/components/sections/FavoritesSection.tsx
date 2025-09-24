'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function FavoritesSection() {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const recentFavorites = favorites.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-2">❤️</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Favorites
          </h2>
        </div>
        {favorites.length > 5 && (
          <Link
            href="/favorites"
            className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            View all
          </Link>
        )}
      </div>
      
      {recentFavorites.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No favorites yet. Start adding content you love!
        </p>
      ) : (
        <AnimatePresence>
          <div className="space-y-2">
            {recentFavorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className="capitalize">{item.type}</span>
                  <span className="mx-1">•</span>
                  <span>{item.source}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}