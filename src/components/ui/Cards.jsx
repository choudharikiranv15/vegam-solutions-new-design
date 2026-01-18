import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ children, className, title, subtitle, action }) {
    return (
        <div className={cn(
            "bg-white dark:bg-dark-card rounded-3xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-300 border border-brand-100 dark:border-brand-900/50",
            className
        )}>
            {(title || action) && (
                <div className="flex items-center justify-between mb-6">
                    <div>
                        {title && <h3 className="text-lg font-bold text-brand-900 dark:text-white">{title}</h3>}
                        {subtitle && <p className="text-sm text-brand-500 dark:text-brand-400 mt-1">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
}

export function StatCard({ title, value, trend, trendValue, icon: Icon, color = "brand" }) {
    const colorStyles = {
        brand: "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400",
        success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
        warning: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
        info: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    }[color] || colorStyles.brand;

    return (
        <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-soft border border-brand-100 dark:border-brand-900/50 hover:-translate-y-1 transition-transform duration-300 group">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-brand-500 dark:text-brand-400 mb-1">{title}</p>
                    <h4 className="text-2xl font-bold text-brand-900 dark:text-white group-hover:scale-105 transition-transform origin-left">{value}</h4>
                </div>
                <div className={cn("p-3 rounded-2xl", colorStyles)}>
                    <Icon size={24} />
                </div>
            </div>

            {trend && (
                <div className="flex items-center gap-2 mt-4">
                    <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        trend === 'up'
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    )}>
                        {trend === 'up' ? '↗' : '↘'} {trendValue}
                    </span>
                    <span className="text-xs text-brand-400">vs last month</span>
                </div>
            )}
        </div>
    );
}
