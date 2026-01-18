import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '../../lib/utils';

export default function MainLayout({ children, activeTab, setActiveTab, isDarkMode, toggleTheme }) {
    // Initialize based on screen width (Desktop = open, Mobile/Tablet = closed/collapsed)
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
    );

    // Auto-handle resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex h-screen w-full bg-gray-50 dark:bg-dark-bg transition-colors duration-300 overflow-hidden">
            {/* 1. Static Sidebar Placeholder (Reserves Layout Space + Floating Gap) */}
            {/* w-72 = 16rem(sidebar) + 2rem(gap/margin) */}
            <div className={cn(
                "shrink-0 transition-all duration-300 hidden md:block",
                isSidebarOpen ? "w-72" : "w-24"
            )} />

            {/* 2. The Actual Fixed Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            {/* 3. Main Content Wrapper (Navbar + Scrollable Page) */}
            <div className="flex-1 relative h-full min-w-0">

                {/* Top Navbar - Floating Absolute & Detached */}
                <div className="absolute top-4 left-4 right-4 z-20">
                    <Header
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                        isDarkMode={isDarkMode}
                        toggleTheme={toggleTheme}
                    />
                </div>

                {/* Scrollable Content Area - Starts behind header but padded */}
                <main className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-32 px-6 md:px-8 lg:px-10 pb-6 scroll-smooth">
                    {children}
                </main>

                {/* Mobile overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
