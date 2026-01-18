import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Portfolio from './pages/Portfolio';

// Placeholder for other tabs
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500">
    <div className="w-24 h-24 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-6">
      <span className="text-4xl">🚧</span>
    </div>
    <h2 className="text-2xl font-bold text-brand-900 dark:text-white mb-2">{title}</h2>
    <p className="text-brand-500 dark:text-brand-400 max-w-md">
      This module is currently under development. Check back soon for updates!
    </p>
  </div>
);

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sync URL to State
  useEffect(() => {
    const path = location.pathname.substring(1) || 'dashboard'; // remove root slash
    if (['dashboard', 'users', 'chat', 'analytics', 'transactions', 'portfolio', 'settings', 'profile', 'notifications'].includes(path)) {
      setActiveTab(path);
    } else {
      setActiveTab('dashboard');
    }
  }, [location]);

  // Handle Tab Change (Sync State to URL)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
    <MainLayout
      activeTab={activeTab}
      setActiveTab={handleTabChange}
      isDarkMode={isDarkMode}
      toggleTheme={() => setIsDarkMode(!isDarkMode)}
    >
      {renderContent()}
    </MainLayout>
  );
}

export default App;
