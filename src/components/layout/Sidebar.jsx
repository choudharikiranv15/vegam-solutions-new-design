import React from 'react';
import { LayoutDashboard, PieChart, Activity, Wallet, Settings, LogOut, Hexagon, MessageSquare, Users } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Users, label: 'Users', id: 'users' },
    { icon: MessageSquare, label: 'Chat', id: 'chat' },
    { icon: PieChart, label: 'Analytics', id: 'analytics' },
    { icon: Activity, label: 'Transactions', id: 'transactions' },
    { icon: Wallet, label: 'Portfolio', id: 'portfolio' },
    { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
    return (
        <aside className={cn(
            "fixed left-0 top-0 bottom-0 m-4 rounded-3xl bg-white/80 dark:bg-dark-surface/95 backdrop-blur-xl border border-white/20 dark:border-white/10 text-brand-900 dark:text-white transition-all duration-300 z-50 flex flex-col shadow-2xl overflow-hidden",
            isOpen ? "w-64" : "w-0 md:w-20 lg:w-64"
        )}>
            {/* Logo */}
            <div className="h-24 flex items-center px-8 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-600 p-2.5 rounded-xl shadow-lg shadow-brand-500/20 backdrop-blur-md border border-white/10">
                        <Hexagon size={26} className="text-white fill-white/20" />
                    </div>
                    <span className={cn("font-bold text-xl tracking-tight whitespace-nowrap opacity-100 transition-opacity drop-shadow-sm text-brand-900 dark:text-white",
                        !isOpen && "md:hidden lg:block hidden")}>
                        Vegam
                    </span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-4 space-y-1 overflow-hidden">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                            activeTab === item.id
                                ? "bg-brand-600 shadow-lg shadow-brand-500/40 text-white translate-x-1"
                                : "text-brand-600 dark:text-brand-200/80 hover:bg-brand-50 dark:hover:bg-white/10 hover:text-brand-900 dark:hover:text-white hover:scale-[1.02]"
                        )}
                    >
                        <item.icon size={22} className={cn("min-w-[22px] transition-transform duration-300", activeTab === item.id && "scale-110")} />
                        <span className={cn("font-medium whitespace-nowrap transition-all",
                            !isOpen && "md:hidden lg:block hidden")}>
                            {item.label}
                        </span>

                        {/* Glass Highlight for Hover */}
                        {activeTab !== item.id && (
                            <div className="absolute inset-0 rounded-2xl bg-brand-500/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        )}
                    </button>
                ))}
            </nav>



            {/* User / Footer */}
            <div className="p-6 shrink-0">
                <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-brand-500 dark:text-brand-300/80 hover:bg-brand-50 dark:hover:bg-white/10 hover:text-brand-900 dark:hover:text-white transition-all duration-300 border border-transparent hover:border-brand-200 dark:hover:border-white/5 group">
                    <LogOut size={22} className="min-w-[22px] group-hover:-translate-x-1 transition-transform" />
                    <span className={cn("font-medium whitespace-nowrap", !isOpen && "md:hidden lg:block hidden")}>Log Out</span>
                </button>
            </div>
        </aside>
    );
}
