'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const { categories } = useSelector((state: RootState) => state.preferences);

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="-mt-12 flex items-end space-x-4">
              <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.name || 'User'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Favorite Categories
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {categories.join(', ') || 'None selected'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Favorites
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {favorites.length} items
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member Since
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Account Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  Free Account
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </motion.div>
    </div>
  );
}