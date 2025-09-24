'use client';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function AnalyticsPage() {
  const { items } = useSelector((state: RootState) => state.content);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  // Calculate statistics
  const stats = {
    totalContent: items.length,
    totalFavorites: favorites.length,
    contentByType: {
      news: items.filter(item => item.type === 'news').length,
      recommendations: items.filter(item => item.type === 'recommendation').length,
      social: items.filter(item => item.type === 'social').length,
    },
    engagementRate: favorites.length > 0 ? ((favorites.length / items.length) * 100).toFixed(1) : '0',
  };

  const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <span className="text-3xl mr-3">📊</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Content" value={stats.totalContent} icon="📚" />
          <StatCard title="Favorites" value={stats.totalFavorites} icon="❤️" />
          <StatCard title="Engagement Rate" value={`${stats.engagementRate}%`} icon="📈" />
          <StatCard title="Active Sources" value="3" icon="🌐" />
        </div>

        {/* Content Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Content Distribution
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">News</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {stats.contentByType.news}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(stats.contentByType.news / stats.totalContent) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Recommendations</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {stats.contentByType.recommendations}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(stats.contentByType.recommendations / stats.totalContent) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">Social</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {stats.contentByType.social}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${(stats.contentByType.social / stats.totalContent) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {favorites.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <span className="text-2xl">
                  {item.type === 'news' ? '📰' : item.type === 'recommendation' ? '🎬' : '💬'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Added to favorites • {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {favorites.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}