'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  setCategories,
  toggleContentSource,
  setLanguage,
  resetPreferences,
} from '@/store/slices/preferencesSlice';
import { motion } from 'framer-motion';

const availableCategories = [
  'Technology',
  'Sports',
  'Finance',
  'Entertainment',
  'Health',
  'Science',
  'Politics',
  'Business',
  'Travel',
  'Food',
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
];

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const preferences = useSelector((state: RootState) => state.preferences);
  const [selectedCategories, setSelectedCategories] = useState(preferences.categories);

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category.toLowerCase())
      ? selectedCategories.filter(c => c !== category.toLowerCase())
      : [...selectedCategories, category.toLowerCase()];
    
    setSelectedCategories(newCategories);
    dispatch(setCategories(newCategories));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all preferences?')) {
      dispatch(resetPreferences());
      setSelectedCategories(['technology', 'sports', 'finance']);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
          {/* Categories Section */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Content Categories
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select the categories you're interested in
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableCategories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.toLowerCase())}
                    onChange={() => handleCategoryToggle(category)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Content Sources Section */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Content Sources
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Enable or disable content sources
            </p>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">News</span>
                <input
                  type="checkbox"
                  checked={preferences.contentSources.news}
                  onChange={() => dispatch(toggleContentSource('news'))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Recommendations</span>
                <input
                  type="checkbox"
                  checked={preferences.contentSources.recommendations}
                  onChange={() => dispatch(toggleContentSource('recommendations'))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Social Media</span>
                <input
                  type="checkbox"
                  checked={preferences.contentSources.social}
                  onChange={() => dispatch(toggleContentSource('social'))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            </div>
          </div>

          {/* Language Section */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Language
            </h2>
            <select
              value={preferences.language}
              onChange={handleLanguageChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="p-6 flex justify-end space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Reset to Default
            </button>
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}