import React, { useState } from 'react';
import { Card } from '../components/ui/Cards';
import { User, Bell, Shield, Globe, Monitor, Moon, Volume2, Save } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const [toggles, setToggles] = useState({
        emailNotifs: true,
        pushNotifs: false,
        marketing: true,
        twoFactor: true,
        autoSave: true
    });

    const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'account', label: 'Account', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Monitor },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Settings</h1>
                    <p className="text-brand-500 dark:text-brand-400 mt-1">Manage your preferences and application configuration.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all shadow-lg hover:shadow-brand-500/25 font-medium text-sm">
                    <Save size={16} /> Save Changes
                </button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 scrollbar-hide border-b border-brand-100 dark:border-brand-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap",
                            activeTab === tab.id
                                ? "border-brand-600 text-brand-600 dark:text-brand-400 dark:border-brand-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                {/* Settings Form */}
                <div className="md:col-span-2 space-y-6">
                    {activeTab === 'general' && (
                        <Card title="General Preferences" subtitle="Customize regional and language settings.">
                            <div className="space-y-6 mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                                        <select className="w-full p-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-transparent text-sm focus:ring-2 focus:ring-brand-500/20 outline-none text-brand-900 dark:text-white">
                                            <option>English (United States)</option>
                                            <option>French (Français)</option>
                                            <option>German (Deutsch)</option>
                                            <option>Spanish (Español)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Zone</label>
                                        <select className="w-full p-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-transparent text-sm focus:ring-2 focus:ring-brand-500/20 outline-none text-brand-900 dark:text-white">
                                            <option>Pacific Time (PT)</option>
                                            <option>Eastern Time (ET)</option>
                                            <option>Greenwich Mean Time (GMT)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Format</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="dateFormat" className="text-brand-600 focus:ring-brand-500" defaultChecked />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">MM/DD/YYYY</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="dateFormat" className="text-brand-600 focus:ring-brand-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">DD/MM/YYYY</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {activeTab === 'notifications' && (
                        <Card title="Notification Settings" subtitle="Choose what you want to be notified about.">
                            <div className="space-y-6 mt-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-brand-800/50">
                                    <div>
                                        <h4 className="text-sm font-semibold text-brand-900 dark:text-white">Email Notifications</h4>
                                        <p className="text-xs text-gray-500">Receive daily summaries and critical alerts via email.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={toggles.emailNotifs} onChange={() => toggle('emailNotifs')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-brand-800/50">
                                    <div>
                                        <h4 className="text-sm font-semibold text-brand-900 dark:text-white">Push Notifications</h4>
                                        <p className="text-xs text-gray-500">Receive real-time alerts on your desktop.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={toggles.pushNotifs} onChange={() => toggle('pushNotifs')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <div>
                                        <h4 className="text-sm font-semibold text-brand-900 dark:text-white">Marketing Emails</h4>
                                        <p className="text-xs text-gray-500">Receive offers, newsletters, and product updates.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={toggles.marketing} onChange={() => toggle('marketing')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-600"></div>
                                    </label>
                                </div>
                            </div>
                        </Card>
                    )}

                    {(activeTab === 'account' || activeTab === 'appearance' || activeTab === 'security') && (
                        <Card className="flex items-center justify-center min-h-[300px] bg-brand-50/50 border-dashed border-2">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-brand-100 dark:bg-brand-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Settings size={32} className="text-brand-500 animate-spin-slow" />
                                </div>
                                <h3 className="text-lg font-bold text-brand-900 dark:text-white">Coming Soon</h3>
                                <p className="text-sm text-brand-500 max-w-xs mx-auto mt-2">
                                    Advanced settings for {activeTab} are currently being developed. Check back later!
                                </p>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card title="Help & Support" className="bg-gradient-to-br from-brand-600 to-purple-700 text-white border-none">
                        <p className="text-sm text-brand-100 mb-4 leading-relaxed">
                            Need assistance? Our support team is available 24/7 to help you with any issues.
                        </p>
                        <button className="w-full py-2.5 bg-white text-brand-600 rounded-xl text-sm font-bold hover:bg-brand-50 transition-colors shadow-sm">
                            Contact Support
                        </button>
                    </Card>

                    <Card title="System Status">
                        <div className="space-y-3 mt-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">API Status</span>
                                <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Database</span>
                                <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Version</span>
                                <span className="text-brand-900 dark:text-white font-mono text-xs">v2.4.0</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
