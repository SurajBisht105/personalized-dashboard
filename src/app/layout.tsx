'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useEffect } from 'react';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Note: We'll access Redux state inside the Provider
  return <>{children}</>;
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personalized Content Dashboard" />
      </head>
      <body className="antialiased">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <DashboardLayout>{children}</DashboardLayout>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}