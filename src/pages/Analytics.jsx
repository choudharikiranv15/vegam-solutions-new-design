import React from 'react';
import { Card, StatCard } from '../components/ui/Cards';
import { Users, UserCheck, UserX, ShieldCheck, PieChart, Activity, TrendingUp, BarChart } from 'lucide-react';
import { useUserStats } from '../hooks/useUsers';
import { cn } from '../lib/utils';

export default function Analytics() {
    const { data: statsData, isLoading } = useUserStats();
    const stats = statsData?.data || { totalUsers: 0, activeUsers: 0, inactiveUsers: 0, roles: {} };

    // Calculate percentages
    const totalRoles = Object.values(stats.roles).reduce((a, b) => a + b, 0) || 1;
    const roleDistribution = [
        { label: 'Admin', val: stats.roles['Admin'] || 0, color: 'bg-purple-500' },
        { label: 'Manager', val: stats.roles['Manager'] || 0, color: 'bg-blue-500' },
        { label: 'Editor', val: stats.roles['Editor'] || 0, color: 'bg-indigo-500' },
        { label: 'Viewer', val: stats.roles['Viewer'] || 0, color: 'bg-cyan-500' },
        { label: 'Standard User', val: stats.roles['Standard User'] || 0, color: 'bg-emerald-500' },
    ].map(item => ({ ...item, percent: Math.round((item.val / totalRoles) * 100) }));

    const activePercent = Math.round((stats.activeUsers / (stats.totalUsers || 1)) * 100);
    const inactivePercent = 100 - activePercent;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Analytics</h1>
                <p className="text-brand-500 dark:text-brand-400 mt-1">Deep dive into user performance and ecosystem statistics.</p>
            </div>

            {/* Top-Level KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Ecosystem"
                    value={isLoading ? "..." : stats.totalUsers.toLocaleString()}
                    trend="up"
                    trendValue="+5.2%"
                    icon={Users}
                    color="brand"
                />
                <StatCard
                    title="Active Engagement"
                    value={isLoading ? "..." : stats.activeUsers.toLocaleString()}
                    trend="up"
                    trendValue={`${activePercent}%`}
                    icon={Activity}
                    color="success"
                />
                <StatCard
                    title="Dormant Accounts"
                    value={isLoading ? "..." : stats.inactiveUsers.toLocaleString()}
                    trend="down"
                    trendValue={`${inactivePercent}%`}
                    icon={UserX}
                    color="warning"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Detailed Role Breakdown */}
                <Card title="User Distribution by Role" subtitle="Breakdown of permission levels across the platform">
                    <div className="space-y-6 mt-4">
                        {roleDistribution.map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-3 h-3 rounded-full", item.color)}></div>
                                        <span className="font-medium text-brand-700 dark:text-brand-200">{item.label}</span>
                                    </div>
                                    <span className="text-sm font-bold text-brand-900 dark:text-white">{item.val} Users ({item.percent}%)</span>
                                </div>
                                <div className="w-full h-2 bg-brand-50 dark:bg-brand-900/50 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full transition-all duration-1000 ease-out", item.color)}
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Engagement Metrics (Visual) */}
                <Card title="Engagement Overview" subtitle="Active vs Inactive User Ratio">
                    <div className="flex flex-col items-center justify-center p-6 h-full">
                        <div className="relative w-64 h-64 mb-8">
                            {/* CSS Pie Chart Hack */}
                            <div className="absolute inset-0 rounded-full border-[32px] border-gray-100 dark:border-brand-900/30"></div>
                            <div
                                className="absolute inset-0 rounded-full border-[32px] border-transparent border-t-emerald-500 border-r-emerald-500 transition-all duration-1000 ease-out"
                                style={{ transform: `rotate(${activePercent * 3.6}deg)` }}
                            ></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-brand-900 dark:text-white">{activePercent}%</span>
                                <span className="text-sm font-medium text-brand-500 uppercase tracking-wide">Active Rate</span>
                            </div>
                        </div>

                        <div className="flex w-full justify-center gap-8 border-t border-brand-100 dark:border-brand-800 pt-6">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-brand-900 dark:text-white">{stats.activeUsers}</span>
                                <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                                    <UserCheck size={14} /> Active
                                </span>
                            </div>
                            <div className="h-10 w-px bg-brand-200 dark:bg-brand-700"></div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-brand-900 dark:text-white">{stats.inactiveUsers}</span>
                                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <UserX size={14} /> Inactive
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Growth Chart (Placeholder Style matches Dashboard) */}
            <Card title="Platform Growth" subtitle="New user acquisitions over time">
                <div className="h-64 flex items-end justify-between gap-2 mt-4 px-2">
                    {[35, 48, 42, 58, 65, 78, 85, 92, 88, 95, 110, 120].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                            <div
                                className="w-full bg-brand-200 dark:bg-brand-800 rounded-t-lg group-hover:bg-brand-500 dark:group-hover:bg-brand-600 transition-all duration-300 relative"
                                style={{ height: `${(h / 120) * 100}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {h} Users
                                </div>
                            </div>
                            <span className="text-xs text-center text-brand-400 mt-2 block">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
