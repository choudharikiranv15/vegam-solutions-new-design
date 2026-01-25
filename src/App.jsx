import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Chat = lazy(() => import('./pages/Chat'));
const Users = lazy(() => import('./pages/Users'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Profile = lazy(() => import('./pages/Profile'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Settings = lazy(() => import('./pages/Settings'));
const Portfolio = lazy(() => import('./pages/Portfolio'));

// Loading spinner component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-brand-200 dark:border-brand-800"></div>
      <div className="w-12 h-12 rounded-full border-4 border-brand-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sync URL to State
  useEffect(() => {
    // Get the first path segment (ignoring empty first split from leading slash)
    const pathSegment = location.pathname.split('/').filter(Boolean)[0];

    if (!pathSegment) {
      setActiveTab('dashboard');
    } else if (['dashboard', 'users', 'chat', 'analytics', 'transactions', 'portfolio', 'settings', 'profile', 'notifications'].includes(pathSegment)) {
      setActiveTab(pathSegment);
    }
    // Removed the else block that forced reset to dashboard for unknown routes to prevent flickering/loops
  }, [location]);

  // Handle Tab Change (Sync State to URL)
  const handleTabChange = (tab) => {
    navigate(tab === 'dashboard' ? '/' : `/${tab}`);
  };

  // Initialize generic dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Theme effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <Users />;
      case 'chat': return <Chat />;
      case 'analytics': return <Analytics />;
      case 'transactions': return <Transactions />;
      case 'portfolio': return <Portfolio />;
      case 'settings': return <Settings />;
      case 'profile': return <Profile />;
      case 'notifications': return <Notifications />;
      default: return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <MainLayout
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      >
        <Suspense fallback={<PageLoader />}>
          {renderContent()}
        </Suspense>
      </MainLayout>
      <VercelAnalytics />
    </ErrorBoundary>
  );
}

export default App;
