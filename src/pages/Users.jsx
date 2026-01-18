import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../components/ui/Cards';
import { Modal } from '../components/ui/Modal';
import { Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, User, Mail, Shield, Clock, Save, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUsers, useUpdateUser, useDeleteUser } from '../hooks/useUsers';
import { saveAs } from 'file-saver';

// Helper to get initials
const getInitials = (name) => {
    return name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

// Helper to format date
const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
};

const ROLE_DESCRIPTIONS = {
    'Admin': 'Full system access and configuration control',
    'Manager': 'Can manage users and view all content',
    'Editor': 'Can create and edit content',
    'Viewer': 'Read-only access to content',
    'Standard User': 'Basic access privileges',
    'Administrator': 'Full system access and configuration control' // For Profile page consistency if needed
};

export default function Users() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize from URL or defaults
    const [page, setPage] = useState(() => parseInt(searchParams.get('page') || '1'));
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('query') || '');
    const [debouncedSearch, setDebouncedSearch] = useState(() => searchParams.get('query') || '');
    const [statusFilter, setStatusFilter] = useState(() => searchParams.get('status') || 'all');

    // Modal state
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalMode, setModalMode] = useState(null); // 'view', 'edit', 'delete' or null

    // Simple debounce for search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            if (searchTerm !== debouncedSearch) {
                setPage(1); // Reset to first page on new search
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Update URL when state changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        // Page
        if (page > 1) params.set('page', page.toString());
        else params.delete('page');

        // Search
        if (debouncedSearch) params.set('query', debouncedSearch);
        else params.delete('query');

        // Status
        if (statusFilter !== 'all') params.set('status', statusFilter);
        else params.delete('status');

        setSearchParams(params);
    }, [page, debouncedSearch, statusFilter]);

    // Query Hook
    const { data, isLoading, isError, refetch } = useUsers({
        page,
        pageSize,
        query: debouncedSearch,
        status: statusFilter
    });

    const usersList = data?.data?.users || []; // Check the response structure from handlers.js
    const totalCount = data?.data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    // Mutations
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();

    // UI Structure adaptation
    const adaptedUsers = usersList.map(u => ({
        id: u.userId, // Map userId to id for UI compatibility
        name: u.name,
        email: u.email,
        // Map role from groups or use direct role property if updated
        role: u.role || (u.groups?.[0]?.roles?.[0]?.roleName || 'User'),
        status: u.status,
        lastActive: formatDate(u.createdAt), // Use createdAt as proxy for lastActive
        avatar: getInitials(u.name)
    }));

    // --- HANDLERS ---

    // Restore modal state from URL
    useEffect(() => {
        const userId = searchParams.get('userId');
        const action = searchParams.get('action');

        if (userId && action && !selectedUser && usersList.length > 0) {
            const user = usersList.find(u => u.userId === userId);
            if (user) {
                // Adapt user to UI format
                const uiUser = {
                    id: user.userId,
                    name: user.name,
                    email: user.email,
                    role: user.role || (user.groups?.[0]?.roles?.[0]?.roleName || 'User'),
                    status: user.status,
                    lastActive: formatDate(user.createdAt),
                    avatar: getInitials(user.name)
                };
                setSelectedUser(uiUser);
                setModalMode(action);
            }
        }
    }, [searchParams, usersList, selectedUser]); // Check dependencies carefully
    const handleOpenModal = (user, mode) => {
        setSelectedUser({ ...user });
        setModalMode(mode);

        // Sync to URL
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('userId', user.id);
            newParams.set('action', mode);
            return newParams;
        });
    };

    const handleCloseModal = () => {
        setModalMode(null);
        setSelectedUser(null);

        // Clear from URL
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', page.toString()); // Ensure we keep page
            if (debouncedSearch) newParams.set('query', debouncedSearch);
            if (statusFilter !== 'all') newParams.set('status', statusFilter);
            newParams.delete('userId');
            newParams.delete('action');
            return newParams;
        });
    };

    const handleSaveUser = () => {
        if (!selectedUser) return;

        // Prepare updates (map UI id back to userId if needed, but we carry it)
        const updates = {
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role, // Saving role directly as flattened property
            status: selectedUser.status
        };

        updateUserMutation.mutate(
            { userId: selectedUser.id, updates },
            {
                onSuccess: () => {
                    handleCloseModal();
                }
            }
        );
    };

    const handleDeleteUser = () => {
        if (!selectedUser) return;
        deleteUserMutation.mutate(selectedUser.id, {
            onSuccess: () => {
                handleCloseModal();
            }
        });
    };

    const handleFieldChange = (field, value) => {
        setSelectedUser(prev => ({ ...prev, [field]: value }));
    };

    const handleExport = () => {
        if (!usersList.length) return;

        const csvContent = [
            ["ID", "Name", "Email", "Role", "Status", "Joined Date"],
            ...usersList.map(user => [
                user.userId,
                user.name,
                user.email,
                user.role || (user.groups?.[0]?.roles?.[0]?.roleName || 'User'),
                user.status,
                formatDate(user.createdAt)
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "users_export.csv");
    };

    const toggleFilter = () => {
        const nextStatus = statusFilter === 'all' ? 'active' : statusFilter === 'active' ? 'inactive' : 'all';
        setStatusFilter(nextStatus);
        setPage(1);
    };

    // --- RENDER HELPERS ---
    const renderModalContent = () => {
        if (!selectedUser) return null;

        switch (modalMode) {
            case 'view':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center text-center pb-6 border-b border-brand-100 dark:border-white/10">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 p-1 mb-4 shadow-xl shadow-brand-500/20">
                                <div className="w-full h-full rounded-full bg-white dark:bg-brand-900 flex items-center justify-center text-3xl font-bold text-brand-600 dark:text-brand-300">
                                    {selectedUser.avatar}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-brand-900 dark:text-white">{selectedUser.name}</h2>
                            <span className={cn(
                                "mt-2 px-3 py-1 rounded-full text-xs font-semibold capitalize",
                                selectedUser.role === 'Admin' || selectedUser.role === 'admin' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" :
                                    selectedUser.role === 'Editor' || selectedUser.role === 'editor' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" :
                                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            )}>{selectedUser.role}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-800/20 border border-brand-100 dark:border-white/5">
                                <label className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-1 block">Email Address</label>
                                <div className="flex items-center gap-2 text-brand-900 dark:text-white font-medium">
                                    <Mail size={16} className="text-brand-500" />
                                    {selectedUser.email}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-800/20 border border-brand-100 dark:border-white/5">
                                <label className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-1 block">Status</label>
                                <div className="flex items-center gap-2 text-brand-900 dark:text-white font-medium">
                                    {selectedUser.status === 'active'
                                        ? <CheckCircle size={16} className="text-emerald-500" />
                                        : <XCircle size={16} className="text-gray-400" />}
                                    <span className="capitalize">{selectedUser.status}</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-800/20 border border-brand-100 dark:border-white/5">
                                <label className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-1 block">Last Active</label>
                                <div className="flex items-center gap-2 text-brand-900 dark:text-white font-medium">
                                    <Clock size={16} className="text-brand-500" />
                                    {selectedUser.lastActive}
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-800/20 border border-brand-100 dark:border-white/5">
                                <label className="text-xs font-medium text-brand-400 uppercase tracking-wider mb-1 block">User ID</label>
                                <div className="flex items-center gap-2 text-brand-900 dark:text-white font-medium">
                                    <Shield size={16} className="text-brand-500" />
                                    <span className="truncate">#{selectedUser.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'edit':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                                    <input
                                        type="text"
                                        value={selectedUser.name}
                                        onChange={(e) => handleFieldChange('name', e.target.value)}
                                        className="w-full bg-white dark:bg-brand-800/30 border border-brand-200 dark:border-brand-700 rounded-xl pl-10 pr-4 py-3 text-brand-900 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                                    <input
                                        type="email"
                                        value={selectedUser.email}
                                        onChange={(e) => handleFieldChange('email', e.target.value)}
                                        className="w-full bg-white dark:bg-brand-800/30 border border-brand-200 dark:border-brand-700 rounded-xl pl-10 pr-4 py-3 text-brand-900 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Role Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Role</label>
                                    <select
                                        value={selectedUser.role}
                                        onChange={(e) => handleFieldChange('role', e.target.value)}
                                        className="w-full bg-white dark:bg-brand-800/30 border border-brand-200 dark:border-brand-700 rounded-xl px-4 py-3 text-brand-900 dark:text-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Standard User">Standard User</option>
                                    </select>
                                </div>

                                {/* Status Toggle */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-700 dark:text-brand-300">Account Status</label>
                                    <div className="flex items-center gap-3 h-[46px]">
                                        <button
                                            onClick={() => handleFieldChange('status', selectedUser.status === 'active' ? 'inactive' : 'active')}
                                            className={cn(
                                                "relative w-14 h-7 rounded-full transition-colors duration-300",
                                                selectedUser.status === 'active' ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-700"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300",
                                                selectedUser.status === 'active' ? "translate-x-7" : "translate-x-0"
                                            )} />
                                        </button>
                                        <span className={cn(
                                            "text-sm font-medium",
                                            selectedUser.status === 'active' ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"
                                        )}>
                                            {selectedUser.status === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'delete':
                return (
                    <div className="flex flex-col items-center text-center p-4">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 dark:text-red-400 mb-4 animate-in zoom-in duration-300">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete User?</h3>
                        <p className="text-brand-500 dark:text-brand-300 mb-6">
                            Are you sure you want to delete <span className="font-bold text-brand-900 dark:text-white">{selectedUser.name}</span>?
                            This action cannot be undone and will remove all their access permissions immediately.
                        </p>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-900 dark:text-white">User Management</h1>
                    <p className="text-brand-500 dark:text-brand-400 mt-1">Manage team access and permissions.</p>
                </div>
                <button
                    onClick={() => handleOpenModal({ id: Date.now().toString(), name: '', email: '', role: 'Viewer', status: 'active', lastActive: 'Never', avatar: 'NU' }, 'edit')}
                    className="px-5 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors text-sm font-medium shadow-lg shadow-brand-500/30 flex items-center gap-2"
                >
                    <span>+ Add User</span>
                </button>
            </div>

            {/* Filters & Search */}
            <Card className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-dark-bg border border-brand-100 dark:border-brand-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={toggleFilter}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors",
                            statusFilter !== 'all'
                                ? "bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-900/50 dark:border-brand-700 dark:text-brand-300"
                                : "bg-white dark:bg-dark-bg border-brand-100 dark:border-brand-800 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/50"
                        )}
                    >
                        <Filter size={16} className={statusFilter !== 'all' ? "text-brand-600" : ""} />
                        {statusFilter === 'all' ? 'Filter: All' : `Filter: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`}
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-bg border border-brand-100 dark:border-brand-800 rounded-xl text-sm font-medium text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/50 transition-colors"
                    >
                        Export
                    </button>
                </div>
            </Card>

            {/* Users Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-brand-50/50 dark:bg-brand-900/20 border-b border-brand-100 dark:border-brand-800">
                            <tr className="text-left text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined On</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-50 dark:divide-brand-800/50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-brand-500 dark:text-brand-400">Loading users...</td>
                                </tr>
                            ) : adaptedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-brand-500 dark:text-brand-400">No users found</td>
                                </tr>
                            ) : (
                                adaptedUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-200 to-purple-200 dark:from-brand-800 dark:to-purple-900 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold text-sm">
                                                    {user.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-brand-900 dark:text-white">{user.name}</p>
                                                    <p className="text-xs text-brand-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 overflow-visible">
                                            <div className="flex items-center gap-2 group/role relative cursor-help w-fit">
                                                <Shield size={14} className="text-brand-400" />
                                                <span className="text-sm text-brand-700 dark:text-brand-300 capitalize border-b border-dashed border-brand-300 dark:border-brand-700">{user.role}</span>

                                                {/* Tooltip */}
                                                <div className="absolute left-0 bottom-full mb-2 w-48 p-2.5 bg-brand-900 dark:bg-black text-white text-xs rounded-xl shadow-xl opacity-0 invisible group-hover/role:opacity-100 group-hover/role:visible transition-all duration-200 z-50 pointer-events-none translate-y-2 group-hover/role:translate-y-0">
                                                    <p className="font-semibold mb-0.5">{user.role}</p>
                                                    <p className="text-brand-200 leading-tight">{ROLE_DESCRIPTIONS[user.role] || 'No description available'}</p>
                                                    <div className="absolute left-4 -bottom-1 w-2.5 h-2.5 bg-brand-900 dark:bg-black rotate-45 transform"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                                                user.status === 'active'
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                                                    : "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                                            )}>
                                                {user.status === 'active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                <span className="capitalize">{user.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-brand-500 dark:text-brand-400">{user.lastActive}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenModal(user, 'view')}
                                                    className="p-2 hover:bg-brand-100 dark:hover:bg-brand-800 rounded-lg text-brand-500 dark:text-brand-400 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(user, 'edit')}
                                                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg text-blue-500 dark:text-blue-400 transition-colors"
                                                    title="Edit User"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(user, 'delete')}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg text-red-500 dark:text-red-400 transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex items-center justify-between p-4 border-t border-brand-100 dark:border-brand-800">
                    <p className="text-sm text-brand-500 dark:text-brand-400">
                        Page <span className="font-medium text-brand-900 dark:text-white">{page}</span> of <span className="font-medium text-brand-900 dark:text-white">{totalPages}</span>
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1 || isLoading}
                            className="p-2 rounded-lg border border-brand-200 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed text-brand-600 dark:text-brand-300"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages || isLoading}
                            className="p-2 rounded-lg border border-brand-200 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed text-brand-600 dark:text-brand-300"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </Card>

            {/* MODAL */}
            <Modal
                isOpen={!!modalMode}
                onClose={handleCloseModal}
                title={
                    modalMode === 'view' ? "User Profile" :
                        modalMode === 'edit' ? "Edit User" :
                            "Confirm Action"
                }
                size={modalMode === 'view' ? 'md' : 'sm'}
                footer={
                    modalMode === 'view' ? (
                        <button
                            onClick={handleCloseModal}
                            className="px-4 py-2 bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-200 rounded-xl hover:bg-brand-200 dark:hover:bg-brand-700 transition-colors text-sm font-medium"
                        >
                            Close
                        </button>
                    ) : modalMode === 'edit' ? (
                        <>
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/50 rounded-xl transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveUser}
                                className="px-4 py-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors text-sm font-medium flex items-center gap-2 shadow-lg shadow-brand-500/20"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium shadow-lg shadow-red-500/20"
                            >
                                Delete User
                            </button>
                        </>
                    )
                }
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}
