import React, { useState } from 'react';
import { Card } from '../components/ui/Cards';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, DollarSign, Calendar, CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';
import { saveAs } from 'file-saver';

// Mock Data
const TRANSACTIONS = [
    { id: 'TX-1001', user: 'James Smith', type: 'subscription', amount: 99.00, status: 'completed', date: '2024-03-10T14:30:00', method: 'Visa ending 4242' },
    { id: 'TX-1002', user: 'Sarah Wilson', type: 'refund', amount: -49.99, status: 'completed', date: '2024-03-09T09:15:00', method: 'Mastercard ending 5555' },
    { id: 'TX-1003', user: 'Mike Chen', type: 'subscription', amount: 299.00, status: 'pending', date: '2024-03-08T18:45:00', method: 'PayPal' },
    { id: 'TX-1004', user: 'Emily Davis', type: 'purchase', amount: 125.50, status: 'failed', date: '2024-03-08T11:20:00', method: 'Visa ending 1234' },
    { id: 'TX-1005', user: 'David Kim', type: 'subscription', amount: 99.00, status: 'completed', date: '2024-03-07T16:00:00', method: 'Amex ending 9000' },
    { id: 'TX-1006', user: 'Lisa Wang', type: 'purchase', amount: 450.00, status: 'completed', date: '2024-03-06T10:10:00', method: 'Wire Transfer' },
    { id: 'TX-1007', user: 'Robert Fox', type: 'subscription', amount: 99.00, status: 'completed', date: '2024-03-05T13:45:00', method: 'Visa ending 8888' },
    { id: 'TX-1008', user: 'Julia Green', type: 'refund', amount: -25.00, status: 'processed', date: '2024-03-04T09:30:00', method: 'Balance Credit' },
];

export default function Transactions() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filter Logic
    const filteredTransactions = TRANSACTIONS.filter(t => {
        const matchesSearch =
            t.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Formatting Helpers
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatDate = (dateStr) => {
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateStr));
    };

    const handleExport = () => {
        const csvContent = [
            ["Transaction ID", "User", "Type", "Amount", "Status", "Date", "Method"],
            ...filteredTransactions.map(t => [t.id, t.user, t.type, t.amount, t.status, t.date, t.method])
        ].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "transactions_export.csv");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Transactions</h1>
                    <p className="text-brand-500 dark:text-brand-400 mt-1">Monitor payments, refunds, and logs.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-dark-card border border-brand-100 dark:border-brand-700 text-brand-600 dark:text-brand-300 rounded-xl hover:bg-brand-50 transition-colors text-sm font-medium shadow-sm"
                    >
                        <Download size={16} /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors text-sm font-medium shadow-lg shadow-brand-500/30">
                        <Filter size={16} /> Advanced Filter
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-brand-600 to-purple-700 text-white border-none shadow-xl shadow-brand-600/20">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-brand-100 font-medium mb-1">Total Revenue</p>
                            <h3 className="text-3xl font-bold">$45,231.89</h3>
                            <div className="flex items-center gap-1 text-emerald-300 text-sm mt-2 bg-white/10 w-fit px-2 py-0.5 rounded-lg">
                                <ArrowUpRight size={14} /> +12.5% vs last month
                            </div>
                        </div>
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <DollarSign size={24} className="text-white" />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-brand-500 dark:text-brand-400 font-medium mb-1">Total Refunds</p>
                            <h3 className="text-3xl font-bold text-brand-900 dark:text-white">$1,204.50</h3>
                            <div className="flex items-center gap-1 text-red-500 text-sm mt-2">
                                <ArrowDownLeft size={14} /> -2.4% vs last month
                            </div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <ArrowDownLeft size={24} className="text-red-500" />
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-brand-500 dark:text-brand-400 font-medium mb-1">Active Subscriptions</p>
                            <h3 className="text-3xl font-bold text-brand-900 dark:text-white">892</h3>
                            <div className="flex items-center gap-1 text-emerald-500 text-sm mt-2">
                                <ArrowUpRight size={14} /> +5.2% vs last month
                            </div>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                            <CreditCard size={24} className="text-emerald-500" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search & Filters */}
            <Card className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or User..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-dark-bg border border-brand-100 dark:border-brand-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    {['all', 'completed', 'pending', 'failed', 'processed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors whitespace-nowrap",
                                statusFilter === status
                                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                                    : "bg-white dark:bg-dark-bg border border-brand-100 dark:border-brand-800 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/50"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </Card>

            {/* Transactions Table */}
            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-brand-50/50 dark:bg-brand-900/20 border-b border-brand-100 dark:border-brand-800">
                            <tr className="text-left text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50 dark:divide-brand-800/50">
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-brand-500 dark:text-brand-400">
                                        No transactions found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((t) => (
                                    <tr key={t.id} className="group hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("p-2 rounded-lg",
                                                    t.type === 'refund' ? "bg-red-50 text-red-500 dark:bg-red-900/20" : "bg-brand-50 text-brand-500 dark:bg-brand-900/20"
                                                )}>
                                                    <DollarSign size={16} />
                                                </div>
                                                <span className="font-medium text-brand-900 dark:text-white text-sm">{t.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-brand-900 dark:text-white">{t.user}</span>
                                                <span className="text-xs text-brand-400">{t.method}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-brand-500 dark:text-brand-400">
                                                <Calendar size={14} />
                                                {formatDate(t.date)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "text-sm font-bold",
                                                t.amount < 0 ? "text-red-500" : "text-brand-900 dark:text-white"
                                            )}>
                                                {t.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(t.amount))}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border",
                                                t.status === 'completed' || t.status === 'processed'
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                                    : t.status === 'pending'
                                                        ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                                                        : "bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                                            )}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-brand-600 dark:text-brand-400 hover:underline text-sm font-medium">
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Static for now) */}
                <div className="flex items-center justify-between p-4 border-t border-brand-100 dark:border-brand-800">
                    <p className="text-sm text-brand-500 dark:text-brand-400">
                        Showing <span className="font-medium text-brand-900 dark:text-white">{filteredTransactions.length}</span> results
                    </p>
                    <div className="flex gap-2">
                        <button disabled className="px-3 py-1 rounded-lg border border-brand-200 dark:border-brand-700 text-gray-400 text-sm cursor-not-allowed">Previous</button>
                        <button disabled className="px-3 py-1 rounded-lg border border-brand-200 dark:border-brand-700 text-gray-400 text-sm cursor-not-allowed">Next</button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
