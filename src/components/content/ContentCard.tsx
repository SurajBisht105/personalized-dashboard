'use client';

import { ContentItem } from '@/types';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';

interface ContentCardProps {
  item: ContentItem;
  isDragging?: boolean;
}

export default function ContentCard({ item, isDragging }: ContentCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(fav => fav.id === item.id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(item));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'news':
        return 'badge-primary';
      case 'recommendation':
        return 'badge-success';
      case 'social':
        return 'badge-warning';
      default:
        return 'badge';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`content-card p-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      data-testid="content-card"
    >
      {item.imageUrl && (
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <span className={`badge ${getTypeColor(item.type)}`}>
              {item.type}
            </span>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{item.source}</span>
            <span>•</span>
            <span>{new Date(item.timestamp).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFavoriteClick}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Add to favorites"
              data-testid="favorite-button"
            >
              <span className="text-xl">{isFavorite ? '❤️' : '🤍'}</span>
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Share"
            >
              <span className="text-xl">📤</span>
            </button>
          </div>
        </div>
        
        <div className="pt-2">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 transition-colors"
          >
            {item.type === 'news' ? 'Read More' : item.type === 'recommendation' ? 'View' : 'Open'}
          </a>
        </div>
      </div>
    </motion.div>
  );
}