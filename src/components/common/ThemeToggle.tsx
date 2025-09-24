'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleDarkMode } from '@/store/slices/preferencesSlice';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.preferences.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
      data-testid="theme-toggle"
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-xl"
      >
        {darkMode ? '🌙' : '☀️'}
      </motion.div>
    </button>
  );
}