import React from 'react';
import { Card, StatCard } from '../components/ui/Cards';
import { DollarSign, TrendingUp, Users, CreditCard, ArrowRight, ShieldCheck, UserCheck, UserX } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUserStats } from '../hooks/useUsers';

export default function Dashboard() {
    const { data: statsData, isLoading } = useUserStats();
    const stats = statsData?.data || { totalUsers: 0, activeUsers: 0, inactiveUsers: 0, roles: {} };
    const [hoveredRole, setHoveredRole] = React.useState(null);

    // Calculate percentages for the donut chart
    const totalRoles = Object.values(stats.roles).reduce((a, b) => a + b, 0) || 1;
    const roleDistribution = [
        { label: 'Admin', val: stats.roles['Admin'] || 0, color: 'bg-purple-500' },
        { label: 'Manager', val: stats.roles['Manager'] || 0, color: 'bg-blue-500' },
        { label: 'User', val: (stats.roles['Standard User'] || 0) + (stats.roles['Viewer'] || 0) + (stats.roles['Editor'] || 0), color: 'bg-emerald-500' },
    ].map(item => ({ ...item, percent: Math.round((item.val / totalRoles) * 100) }));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Overview</h1>
                    <p className="text-brand-500 dark:text-brand-400 mt-1">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-dark-card border border-brand-100 dark:border-brand-700 text-brand-600 dark:text-brand-300 rounded-xl hover:bg-brand-50 transition-colors text-sm font-medium shadow-sm">
                        Download Report
                    </button>
                    <button className="px-5 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors text-sm font-medium shadow-lg shadow-brand-500/30">
                        Create Message
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={isLoading ? "..." : stats.totalUsers.toLocaleString()}
                    trend="up"
                    trendValue="12.5%"
                    icon={Users}
                    color="brand"
                />
                <StatCard
                    title="Active Users"
                    value={isLoading ? "..." : stats.activeUsers.toLocaleString()}
                    trend="up"
                    trendValue={`${Math.round((stats.activeUsers / (stats.totalUsers || 1)) * 100)}%`}
                    icon={UserCheck}
                    color="success"
                />
                <StatCard
                    title="Inactive Useers"
                    value={isLoading ? "..." : stats.inactiveUsers.toLocaleString()}
                    trend="down"
                    trendValue="2.4%"
                    icon={UserX}
                    color="warning"
                />
                <StatCard
                    title="Admins"
                    value={isLoading ? "..." : (stats.roles['Admin'] || 0).toLocaleString()}
                    trend="up"
                    trendValue="Stable"
                    icon={ShieldCheck}
                    color="info"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <Card className="lg:col-span-2 min-h-[400px] flex flex-col" title="User Activity" subtitle="Overview of user engagement over the last 6 months">
                    <div className="flex-1 p-4 pb-2">
                        <div className="relative w-full h-full">
                            {/* Y-Axis Labels */}
                            <div className="absolute left-0 top-0 bottom-6 w-12 flex flex-col justify-between text-xs font-medium text-brand-300 dark:text-brand-600 z-10 select-none">
                                <span className="-translate-y-1/2 text-right pr-3">100%</span>
                                <span className="-translate-y-1/2 text-right pr-3">50%</span>
                                <span className="translate-y-1/2 text-right pr-3">0%</span>
                            </div>

                            {/* Chart Area (Lines + Bars) */}
                            <div className="absolute left-12 right-0 top-0 bottom-6">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                    <div className="h-[1px] w-full bg-brand-50 dark:bg-brand-900/40 border-t border-dashed border-brand-200 dark:border-brand-800"></div>
                                    <div className="h-[1px] w-full bg-brand-50 dark:bg-brand-900/40 border-t border-dashed border-brand-200 dark:border-brand-800"></div>
                                    <div className="h-[1px] w-full bg-brand-200 dark:bg-brand-700"></div>
                                </div>

                                {/* Bars SVG */}
                                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#7c3aed" />
                                        </linearGradient>
                                    </defs>

                                    {[
                                        { val: 85, label: 'Apr' },
                                        { val: 78, label: 'May' },
                                        { val: 92, label: 'Jun' },
                                        { val: 88, label: 'Jul' },
                                        { val: 95, label: 'Aug' },
                                        { val: 90, label: 'Sep' }
                                    ].map((item, i) => {
                                        const segmentWidth = 100 / 6;
                                        const barWidth = 6;
                                        const x = (i * segmentWidth) + (segmentWidth - barWidth) / 2;
                                        const y = 100 - item.val;

                                        return (
                                            <g key={i} className="group">
                                                <rect
                                                    x={x}
                                                    y={y}
                                                    width={barWidth}
                                                    height={item.val}
                                                    rx="1.5"
                                                    fill="url(#barGradient)"
                                                    className="transition-all duration-700 ease-out hover:opacity-80 cursor-pointer dark:opacity-90"
                                                />
                                                <text
                                                    x={x + barWidth / 2}
                                                    y={y - 4}
                                                    textAnchor="middle"
                                                    fontSize="3.5"
                                                    fontWeight="bold"
                                                    className="fill-brand-600 dark:fill-brand-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                >
                                                    {item.val}%
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>

                            {/* X-Axis Labels */}
                            <div className="absolute left-12 right-0 bottom-0 h-6 flex items-end">
                                {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, i) => (
                                    <div key={i} className="flex-1 text-center text-xs font-semibold text-brand-400 dark:text-brand-500">
                                        {month}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Side Widget / Donut */}
                <Card className="min-h-[400px]" title="Role Distribution" subtitle="Users by permission level">
                    <div className="flex items-center justify-center h-56 relative mt-4">
                        <div className="w-40 h-40 rounded-full border-[16px] border-brand-100 dark:border-brand-900/30 relative flex items-center justify-center">
                            {/* Simple CSS Hack for Donut segments - in a real app use a library or complex SVG paths */}
                            <div
                                className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-purple-500 border-r-purple-400 transform transition-transform hover:rotate-90 duration-700"
                                style={{ transform: `rotate(${roleDistribution[0].percent * 3.6}deg)` }}
                            ></div>
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-brand-900 dark:text-white transition-all duration-300">
                                    {hoveredRole ? hoveredRole.val : stats.totalUsers}
                                </span>
                                <span className="text-xs text-brand-500 transition-all duration-300">
                                    {hoveredRole ? hoveredRole.label : 'Total Users'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6">
                        {roleDistribution.map((item, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => setHoveredRole(item)}
                                onMouseLeave={() => setHoveredRole(null)}
                                className="flex items-center justify-between p-3 rounded-xl transition-colors duration-200 hover:bg-brand-50 dark:hover:bg-brand-900/40 cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm ring-2 ring-white dark:ring-dark-card group-hover:ring-brand-100 dark:group-hover:ring-brand-800 transition-all`} />
                                    <span className="text-sm text-brand-700 dark:text-brand-300 font-medium group-hover:text-brand-900 dark:group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-brand-900 dark:text-white">{item.val}</span>
                                    <span className="text-xs text-brand-400 group-hover:text-brand-500 transition-colors">{item.percent}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Transactions placeholder - or convert to Recent Activities */}
            <Card title="Recent Activity" action={
                <button className="text-sm text-brand-500 font-medium hover:text-brand-700 flex items-center gap-1">View All <ArrowRight size={14} /></button>
            }>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-brand-50 dark:bg-brand-900/20 rounded-xl">
                            <tr className="text-left text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">
                                <th className="px-6 py-4 rounded-l-xl">User</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4 rounded-r-xl text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-100 dark:divide-brand-800/50">
                            {[
                                { user: 'James Smith', action: 'Updated Profile', time: '2 mins ago', status: 'Success', icon: 'JS' },
                                { user: 'Sarah Wilson', action: 'Changed Password', time: '15 mins ago', status: 'Success', icon: 'SW' },
                                { user: 'Mike Chen', action: 'Failed Login Attempt', time: '1 hour ago', status: 'Failed', icon: 'MC' },
                                { user: 'Emily Davis', action: 'Created New Group', time: '2 hours ago', status: 'Success', icon: 'ED' },
                            ].map((t, i) => (
                                <tr key={i} className="group hover:bg-brand-50/50 dark:hover:bg-brand-900/10 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-300 font-bold text-xs">
                                                {t.icon}
                                            </div>
                                            <p className="text-sm font-bold text-brand-900 dark:text-white">{t.user}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-brand-600 dark:text-brand-400">{t.action}</td>
                                    <td className="px-6 py-4 text-sm text-brand-500 dark:text-brand-500">{t.time}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={cn(
                                            "text-xs px-2.5 py-1 rounded-full font-medium border",
                                            t.status === 'Success'
                                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                                : "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                                        )}>
                                            {t.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
