'use client';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function TrendingSection() {
  const { items } = useSelector((state: RootState) => state.content);
  
  // Get top 5 items as trending (in a real app, this would come from an API)
  const trendingItems = items.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">🔥</span>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Trending Now
        </h2>
      </div>
      
      <div className="space-y-3">
        {trendingItems.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No trending content available
          </p>
        ) : (
          trendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.source} • {item.type}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}