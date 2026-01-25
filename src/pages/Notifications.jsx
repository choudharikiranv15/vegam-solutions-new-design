import React, { useState } from 'react';
import { Card } from '../components/ui/Cards';
import { Bell, CheckCircle, AlertTriangle, Info, Trash2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'success', title: 'Payment Received', message: 'Invoice #2024-001 has been settled successfully.', time: '2 mins ago', read: false },
        { id: 2, type: 'warning', title: 'Server Load High', message: 'CPU usage is above 90% for the last 5 minutes.', time: '1 hour ago', read: false },
        { id: 3, type: 'info', title: 'New User Signup', message: 'James Bond has joined the workspace via invite link.', time: '3 hours ago', read: true },
        { id: 4, type: 'info', title: 'System Update', message: 'Dashboard v2.1.0 has been deployed. Refresh for new features.', time: '1 day ago', read: true },
        { id: 5, type: 'alert', title: 'Subscription Expiring', message: 'Your Premium plan expires in 3 days. Renew now to avoid interruption.', time: '2 days ago', read: false },
    ]);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} className="text-emerald-500" />;
            case 'warning': return <AlertTriangle size={20} className="text-amber-500" />;
            case 'alert': return <AlertTriangle size={20} className="text-red-500" />;
            default: return <Info size={20} className="text-brand-500" />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Notifications</h1>
                    <p className="text-brand-500 dark:text-brand-400 mt-1">Stay updated with important system events.</p>
                </div>
                <button
                    onClick={markAllRead}
                    className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-700 transition-colors"
                >
                    Mark all as read
                </button>
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/50 rounded-full flex items-center justify-center mb-4">
                            <Bell size={24} className="text-brand-300" />
                        </div>
                        <h3 className="text-lg font-medium text-brand-900 dark:text-white">All caught up!</h3>
                        <p className="text-brand-400">You have no new notifications at this time.</p>
                    </Card>
                ) : (
                    notifications.map((n) => (
                        <div
                            key={n.id}
                            className={cn(
                                "flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300",
                                n.read
                                    ? "bg-white dark:bg-dark-card border-brand-100 dark:border-brand-800 opacity-80"
                                    : "bg-white dark:bg-dark-card border-brand-200 dark:border-brand-700 shadow-sm scale-[1.01] border-l-4 border-l-brand-500"
                            )}
                        >
                            <div className={cn("shrink-0 mt-1 p-2 rounded-full bg-opacity-10",
                                n.type === 'success' ? "bg-emerald-500" :
                                    n.type === 'warning' ? "bg-amber-500" :
                                        n.type === 'alert' ? "bg-red-500" : "bg-brand-500"
                            )}>
                                {getIcon(n.type)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className={cn("text-base font-semibold text-brand-900 dark:text-white", !n.read && "text-brand-700")}>
                                        {n.title}
                                    </h3>
                                    <span className="text-xs font-medium text-brand-400 flex items-center gap-1 shrink-0">
                                        <Clock size={12} /> {n.time}
                                    </span>
                                </div>
                                <p className="text-brand-600 dark:text-brand-300 text-sm mt-1 leading-relaxed">
                                    {n.message}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 shrink-0">
                                {!n.read && (
                                    <button
                                        onClick={() => markAsRead(n.id)}
                                        className="p-1.5 hover:bg-brand-50 dark:hover:bg-brand-800 rounded-lg text-brand-400 hover:text-brand-600 transition-colors"
                                        title="Mark as read"
                                    >
                                        <CheckCircle size={16} />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteNotification(n.id)}
                                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
