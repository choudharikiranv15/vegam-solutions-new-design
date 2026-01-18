import React, { useState } from 'react';
import { Card } from '../components/ui/Cards';
import { Search, Filter, Plus, MoreHorizontal, Calendar, Folder, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const PROJECTS = [
    {
        id: 1,
        title: 'E-Commerce Redesign',
        category: 'Web Development',
        status: 'In Progress',
        progress: 75,
        dueDate: 'Oct 24, 2024',
        image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop',
        team: ['AJ', 'SW', 'MC'],
        budget: '$45,000'
    },
    {
        id: 2,
        title: 'Mobile Banking App',
        category: 'Mobile App',
        status: 'On Hold',
        progress: 30,
        dueDate: 'Nov 15, 2024',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop',
        team: ['DK', 'ED'],
        budget: '$82,000'
    },
    {
        id: 3,
        title: 'Marketing Dashboard',
        category: 'Web Application',
        status: 'Completed',
        progress: 100,
        dueDate: 'Sep 30, 2024',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        team: ['AJ', 'MC', 'DK', 'SW'],
        budget: '$28,500'
    },
    {
        id: 4,
        title: 'Brand Identity',
        category: 'Design',
        status: 'In Progress',
        progress: 60,
        dueDate: 'Oct 10, 2024',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=2670&auto=format&fit=crop',
        team: ['SW'],
        budget: '$15,000'
    },
    {
        id: 5,
        title: 'AI Integration',
        category: 'Backend',
        status: 'Planning',
        progress: 10,
        dueDate: 'Dec 01, 2024',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop',
        team: ['DK', 'AJ'],
        budget: '$120,000'
    },
    {
        id: 6,
        title: 'Customer Portal',
        category: 'Web Development',
        status: 'In Progress',
        progress: 45,
        dueDate: 'Nov 30, 2024',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        team: ['MC', 'ED'],
        budget: '$35,000'
    }
];

export default function Portfolio() {
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.status === filter || p.category === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-500 text-white';
            case 'In Progress': return 'bg-blue-500 text-white';
            case 'On Hold': return 'bg-amber-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Portfolio</h1>
                    <p className="text-brand-500 dark:text-brand-400 mt-1">Manage your active projects and deliverables.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors text-sm font-medium shadow-lg shadow-brand-500/30">
                    <Plus size={18} /> New Project
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-dark-card p-2 rounded-2xl border border-brand-100 dark:border-brand-800 shadow-sm">
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 md:px-0 scrollbar-hide">
                    {['All', 'Web Development', 'Mobile App', 'Design', 'In Progress', 'Completed'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                                filter === f
                                    ? "bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300"
                                    : "text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/40"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="w-full md:w-64 relative px-2 md:px-0">
                    <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-4 py-2 bg-brand-50 dark:bg-dark-bg rounded-xl text-sm border-none focus:ring-2 focus:ring-brand-500/20 outline-none text-brand-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <Card key={project.id} className="p-0 overflow-hidden group hover:shadow-xl transition-all duration-300 border-brand-100 dark:border-brand-800">
                        {/* Image */}
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md p-1.5 rounded-lg cursor-pointer hover:bg-white transition-colors">
                                <MoreHorizontal size={16} className="text-brand-900 dark:text-white" />
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide", getStatusColor(project.status))}>
                                    {project.status}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-1">{project.category}</p>
                                    <h3 className="text-xl font-bold text-brand-900 dark:text-white group-hover:text-brand-600 transition-colors">{project.title}</h3>
                                </div>
                            </div>

                            <div className="mt-4 mb-6">
                                <div className="flex justify-between text-xs mb-1.5 font-medium">
                                    <span className="text-brand-500">Progress</span>
                                    <span className="text-brand-900 dark:text-white">{project.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-brand-100 dark:bg-brand-900/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-brand-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-brand-50 dark:border-brand-800/50">
                                <div className="flex -space-x-2">
                                    {project.team.map((initial, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-800 border-2 border-white dark:border-dark-card flex items-center justify-center text-[10px] font-bold text-brand-600 dark:text-brand-300">
                                            {initial}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-900 border-2 border-white dark:border-dark-card flex items-center justify-center text-[10px] font-bold text-brand-400">
                                        +
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-brand-500">
                                    <Calendar size={14} />
                                    {project.dueDate}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
