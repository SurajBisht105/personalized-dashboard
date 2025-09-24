'use client';

import React from 'react';

// Define the component
function SettingsPage() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(['technology', 'sports', 'finance']);
  const [showSaveMessage, setShowSaveMessage] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [language, setLanguage] = React.useState('en');
  const [contentSources, setContentSources] = React.useState({
    news: true,
    recommendations: true,
    social: true,
  });

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

  const handleCategoryToggle = (category: string) => {
    const categoryLower = category.toLowerCase();
    setSelectedCategories(prev =>
      prev.includes(categoryLower)
        ? prev.filter(c => c !== categoryLower)
        : [...prev, categoryLower]
    );
  };

  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify({
      categories: selectedCategories,
      darkMode,
      language,
      contentSources
    }));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all preferences?')) {
      setSelectedCategories(['technology', 'sports', 'finance']);
      setDarkMode(false);
      setLanguage('en');
      setContentSources({
        news: true,
        recommendations: true,
        social: true,
      });
    }
  };

  React.useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        if (prefs.categories) setSelectedCategories(prefs.categories);
        if (prefs.darkMode !== undefined) setDarkMode(prefs.darkMode);
        if (prefs.language) setLanguage(prefs.language);
        if (prefs.contentSources) setContentSources(prefs.contentSources);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        {showSaveMessage && (
          <div
            className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
            data-testid="success-message"
          >
            Your settings have been saved successfully!
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
          {/* Categories Section */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Content Categories
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select the categories you&apos;re interested in
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
                    data-testid={`category-${category.toLowerCase()}`}
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
                  checked={contentSources.news}
                  onChange={(e) => setContentSources(prev => ({ ...prev, news: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Recommendations</span>
                <input
                  type="checkbox"
                  checked={contentSources.recommendations}
                  onChange={(e) => setContentSources(prev => ({ ...prev, recommendations: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">Social Media</span>
                <input
                  type="checkbox"
                  checked={contentSources.social}
                  onChange={(e) => setContentSources(prev => ({ ...prev, social: e.target.checked }))}
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
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dark Mode Section */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Appearance
            </h2>
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
                data-testid="dark-mode-toggle"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Actions */}
          <div className="p-6 flex justify-end space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              data-testid="save-preferences"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Make sure to export as default
export default SettingsPage;