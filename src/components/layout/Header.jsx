import React from 'react';
import { Search, Bell, Moon, Sun, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function Header({ toggleSidebar, isDarkMode, toggleTheme }) {
    const navigate = useNavigate();

    return (
        <header className="h-20 w-full flex items-center justify-between px-6 bg-white/70 dark:bg-dark-surface/80 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-[2rem] shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-brand-50 text-brand-900 dark:text-brand-100 dark:hover:bg-brand-900 lg:hidden"
                >
                    <Menu size={24} />
                </button>

                {/* Search Bar - Desktop */}
                <div className="hidden md:flex items-center gap-3 bg-brand-50/50 dark:bg-dark-surface px-4 py-2.5 rounded-full border border-brand-100 dark:border-brand-900/50 w-64 focus-within:w-80 transition-all duration-300">
                    <Search size={18} className="text-brand-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-brand-900 dark:text-brand-100 w-full placeholder:text-brand-300"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-full bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 hover:scale-110 transition-transform"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                    onClick={() => navigate('/notifications')}
                    className="relative p-2.5 rounded-full hover:bg-brand-50 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-300 transition-colors"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-bg"></span>
                </button>

                <div
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-3 pl-2 border-l border-brand-100 dark:border-brand-800 cursor-pointer group"
                >
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-brand-900 dark:text-brand-100 leading-tight group-hover:text-brand-600 transition-colors">Admin User</p>
                        <p className="text-xs text-brand-500 dark:text-brand-400">View Profile</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-pink-500 p-[2px] group-hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full bg-white dark:bg-dark-surface flex items-center justify-center overflow-hidden">
                            <User size={20} className="text-brand-500" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
