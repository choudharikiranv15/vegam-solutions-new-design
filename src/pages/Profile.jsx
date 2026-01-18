import React, { useState } from 'react';
import { Card } from '../components/ui/Cards';
import { User, Mail, Shield, Smartphone, MapPin, Globe, Camera, Save, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@vegam.com',
        role: 'Administrator',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        timezone: 'Pacific Time (US & Canada)',
        bio: 'Senior System Administrator with 10+ years of experience in managing enterprise-scale applications. Passionate about efficient workflows and clean UI.'
    });

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save to backend
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
            {/* Sidebar Card */}
            <div className="flex flex-col md:flex-row gap-8 px-4 relative z-10">
                {/* Sidebar Card */}
                <div className="w-full md:w-80 shrink-0 space-y-6">
                    <Card className="flex flex-col items-center pt-0 overflow-visible relative mt-16">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-dark-card shadow-2xl -mt-16 bg-white dark:bg-dark-surface p-1 relative group bg-gradient-to-tr from-brand-200 to-purple-200">
                            {/* Avatar */}
                            <div className="w-full h-full rounded-full bg-brand-600 flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
                                {profile.firstName[0]}{profile.lastName[0]}
                            </div>
                            <button className="absolute bottom-2 right-2 p-2 bg-brand-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform md:opacity-0 group-hover:opacity-100">
                                <Camera size={16} />
                            </button>
                        </div>

                        <div className="text-center mt-4 mb-6">
                            <h2 className="text-2xl font-bold text-brand-900 dark:text-white">{profile.firstName} {profile.lastName}</h2>
                            <span className="inline-block mt-1 px-3 py-1 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs font-semibold rounded-full">
                                {profile.role}
                            </span>
                        </div>

                        <div className="w-full space-y-4 px-4 pb-4">
                            <div className="flex items-center gap-3 text-sm text-brand-600 dark:text-brand-300">
                                <Mail size={16} className="text-brand-400" />
                                {profile.email}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-brand-600 dark:text-brand-300">
                                <Smartphone size={16} className="text-brand-400" />
                                {profile.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-brand-600 dark:text-brand-300">
                                <MapPin size={16} className="text-brand-400" />
                                {profile.location}
                            </div>
                        </div>
                    </Card>

                    <Card title="Account Usage">
                        <div className="space-y-4 mt-2">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-brand-500">Storage Used</span>
                                    <span className="text-brand-700 font-bold dark:text-white">4.2 GB / 10 GB</span>
                                </div>
                                <div className="w-full h-2 bg-brand-100 dark:bg-brand-900/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-500 w-[42%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-brand-500">API Calls</span>
                                    <span className="text-brand-700 font-bold dark:text-white">850 / 1000</span>
                                </div>
                                <div className="w-full h-2 bg-brand-100 dark:bg-brand-900/50 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[85%]"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <Card
                        title="General Information"
                        subtitle="Manage your personal details and preferences."
                        action={
                            !isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-brand-50 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors"
                                >
                                    Edit Details
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors flex items-center gap-2"
                                    >
                                        <Save size={16} /> Save
                                    </button>
                                </div>
                            )
                        }
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-700 dark:text-brand-300">First Name</label>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={profile.firstName}
                                    onChange={e => setProfile({ ...profile, firstName: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-transparent text-brand-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50 disabled:bg-brand-50/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Last Name</label>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={profile.lastName}
                                    onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-transparent text-brand-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-brand-50/50 dark:disabled:bg-white/5 disabled:opacity-70"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Email Address</label>
                                <input
                                    type="email"
                                    disabled={!isEditing}
                                    value={profile.email}
                                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-transparent text-brand-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-brand-50/50 dark:disabled:bg-white/5 disabled:opacity-70"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Role</label>
                                <input
                                    type="text"
                                    disabled={true}
                                    value={profile.role}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 text-brand-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Bio</label>
                                <textarea
                                    rows={4}
                                    disabled={!isEditing}
                                    value={profile.bio}
                                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-brand-700 bg-transparent text-brand-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:bg-brand-50/50 dark:disabled:bg-white/5 disabled:opacity-70 resize-none"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card title="Security & Login">
                        <div className="space-y-4 items-center">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-brand-100 dark:border-brand-800 bg-brand-50/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-brand-100 dark:bg-brand-800/50 rounded-lg text-brand-600 dark:text-brand-400">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-brand-900 dark:text-white">Two-Factor Authentication</p>
                                        <p className="text-xs text-brand-500">Add an extra layer of security to your account.</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">Enabled</button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl border border-brand-100 dark:border-brand-800 bg-brand-50/50 dark:bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-brand-100 dark:bg-brand-800/50 rounded-lg text-brand-600 dark:text-brand-400">
                                        <LogOut size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-brand-900 dark:text-white">Active Sessions</p>
                                        <p className="text-xs text-brand-500">Manage devices logged into your account.</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-200">View All</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    );
}
