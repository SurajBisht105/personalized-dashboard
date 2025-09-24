'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import PersonalizedFeed from '@/components/sections/PersonalizedFeed';
import TrendingSection from '@/components/sections/TrendingSection';
import FavoritesSection from '@/components/sections/FavoritesSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { fetchContent } from '@/store/slices/contentSlice';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.preferences);
  const { items, loading, error } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(fetchContent({ page: 1, categories }));
  }, [dispatch, categories]);

  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-4">
            Failed to load content
          </p>
          <button
            onClick={() => dispatch(fetchContent({ page: 1, categories }))}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Personalized Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PersonalizedFeed />
          </div>
          <div className="space-y-6">
            <TrendingSection />
            <FavoritesSection />
          </div>
        </div>
      </motion.div>
    </div>
  );
}