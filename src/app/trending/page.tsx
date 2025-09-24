'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ContentCard from '@/components/content/ContentCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { motion } from 'framer-motion';

type TimeWindow = 'day' | 'week';
type ContentType = 'all' | 'news' | 'movies' | 'social';

export default function TrendingPage() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('day');
  const [contentType, setContentType] = useState<ContentType>('all');
  const { items, loading } = useSelector((state: RootState) => state.content);

  // Filter trending items (in a real app, this would come from an API)
  const trendingContent = items.filter(item => {
    if (contentType === 'all') return true;
    if (contentType === 'news' && item.type === 'news') return true;
    if (contentType === 'movies' && item.type === 'recommendation') return true;
    if (contentType === 'social' && item.type === 'social') return true;
    return false;
  }).slice(0, 12);

  const trendingHashtags = ['technology', 'sports', 'entertainment', 'news', 'politics'];

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <span className="text-3xl mr-3">🔥</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trending Content
          </h1>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time:
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeWindow('day')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeWindow === 'day'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setTimeWindow('week')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeWindow === 'week'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  This Week
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Type:
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="all">All Content</option>
                <option value="news">News</option>
                <option value="movies">Movies</option>
                <option value="social">Social</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="flex items-center mb-3">
            <span className="text-lg mr-2">#️⃣</span>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Trending Topics
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300 cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
              >
                #{hashtag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : trendingContent.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">
              No trending content available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ContentCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}