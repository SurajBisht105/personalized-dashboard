'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setSearchQuery } from '@/store/slices/contentSlice';
import useDebounce from '@/hooks/useDebounce';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="max-w-lg w-full lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-400">🔍</span>
        </div>
        <input
          id="search"
          name="search"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white"
          placeholder="Search content..."
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          data-testid="search-input"
        />
      </div>
    </div>
  );
}