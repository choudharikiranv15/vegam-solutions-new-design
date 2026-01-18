import React, { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, Image as ImageIcon, Mic, User, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Cards';

// --- MOCK DATA ---
const USERS = [
    { id: 1, name: 'Alex Johnson', role: 'Product Manager', status: 'online', avatar: 'AJ', lastMsg: 'Can we review the roadmap?', time: '2m', unread: 2 },
    { id: 2, name: 'Sarah Wilson', role: 'UX Designer', status: 'busy', avatar: 'SW', lastMsg: 'I uploaded the new mockups.', time: '1h', unread: 0 },
    { id: 3, name: 'Mike Chen', role: 'Frontend Dev', status: 'offline', avatar: 'MC', lastMsg: 'PR is ready for review.', time: '3h', unread: 0 },
    { id: 4, name: 'Emily Davis', role: 'Marketing', status: 'away', avatar: 'ED', lastMsg: 'Meeting at 2 PM?', time: '1d', unread: 0 },
    { id: 5, name: 'David Kim', role: 'Backend Lead', status: 'online', avatar: 'DK', lastMsg: 'API docs updated.', time: '1d', unread: 0 },
];

const MESSAGES = [
    { id: 1, senderId: 1, text: 'Hey, have you checked the new designs?', time: '10:30 AM', type: 'received' },
    { id: 2, senderId: 0, text: 'Yes! They look great. I love the new dark mode.', time: '10:32 AM', type: 'sent' },
    { id: 3, senderId: 1, text: 'Awesome. Sarah did a great job.', time: '10:33 AM', type: 'received' },
    { id: 4, senderId: 1, text: 'Can we schedule a quick sync to discuss implementation?', time: '10:33 AM', type: 'received' },
    { id: 5, senderId: 0, text: 'Sure, I am free after 2 PM.', time: '10:35 AM', type: 'sent' },
    { id: 6, senderId: 1, text: 'Perfect. I will send an invite.', time: '10:36 AM', type: 'received' },
];

export default function Chat() {
    const [activeChat, setActiveChat] = useState(USERS[0]);
    const [msgInput, setMsgInput] = useState('');

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Left Panel: Conversations List */}
            <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4 h-full shrink-0">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full bg-white dark:bg-dark-card border border-brand-100 dark:border-brand-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors shadow-sm text-brand-900 dark:text-white placeholder:text-brand-300"
                    />
                </div>

                {/* List */}
                <Card className="flex-1 overflow-hidden flex flex-col p-0 bg-white dark:bg-dark-card border-brand-100 dark:border-brand-900/50">
                    <div className="p-4 border-b border-brand-50 dark:border-brand-800/50 flex justify-between items-center">
                        <h3 className="font-bold text-brand-900 dark:text-white">Messages</h3>
                        <span className="text-xs bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-300 px-2 py-1 rounded-full">{USERS.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {USERS.map(user => (
                            <button
                                key={user.id}
                                onClick={() => setActiveChat(user)}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left",
                                    activeChat.id === user.id
                                        ? "bg-brand-50 dark:bg-brand-900/30"
                                        : "hover:bg-gray-50 dark:hover:bg-dark-bg/50"
                                )}
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {user.avatar}
                                    </div>
                                    <span className={cn(
                                        "absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-dark-card rounded-full",
                                        user.status === 'online' ? "bg-emerald-500" :
                                            user.status === 'busy' ? "bg-red-500" :
                                                user.status === 'away' ? "bg-amber-500" : "bg-gray-400"
                                    )} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className={cn("text-sm font-semibold truncate", activeChat.id === user.id ? "text-brand-900 dark:text-white" : "text-gray-700 dark:text-gray-300")}>
                                            {user.name}
                                        </h4>
                                        <span className="text-[10px] text-gray-400">{user.time}</span>
                                    </div>
                                    <p className={cn("text-xs truncate", activeChat.id === user.id ? "text-brand-500 dark:text-brand-300" : "text-gray-400")}>
                                        {user.lastMsg}
                                    </p>
                                </div>
                                {user.unread > 0 && (
                                    <div className="w-5 h-5 bg-brand-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                                        {user.unread}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Center Panel: Chat Window */}
            <Card className="flex-1 hidden md:flex flex-col p-0 overflow-hidden bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border border-brand-100 dark:border-brand-900/50 shadow-soft">
                {/* Header */}
                <div className="h-16 px-6 border-b border-brand-50 dark:border-brand-800/50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-300 font-bold text-xs">
                            {activeChat.avatar}
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-brand-900 dark:text-white flex items-center gap-2">
                                {activeChat.name}
                                <span className={cn(
                                    "w-2 h-2 rounded-full",
                                    activeChat.status === 'online' ? "bg-emerald-500" : "bg-gray-400"
                                )} />
                            </h3>
                            <p className="text-xs text-brand-400 dark:text-brand-500">{activeChat.role}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-brand-400 dark:text-brand-500">
                        <button className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-full transition-colors"><Phone size={18} /></button>
                        <button className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-full transition-colors"><Video size={18} /></button>
                        <button className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-full transition-colors"><MoreVertical size={18} /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-brand-50/30 dark:bg-dark-bg/30">
                    <div className="flex justify-center my-4">
                        <span className="text-xs font-medium text-brand-300 dark:text-brand-700 bg-brand-50 dark:bg-brand-900/30 px-3 py-1 rounded-full">Today</span>
                    </div>

                    {MESSAGES.map(msg => {
                        const isMe = msg.type === 'sent';
                        return (
                            <div key={msg.id} className={cn("flex gap-3 max-w-[80%]", isMe ? "ml-auto flex-row-reverse" : "")}>
                                {!isMe && (
                                    <div className="w-8 h-8 rounded-full bg-brand-200 dark:bg-brand-800 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold text-xs shrink-0 mt-1">
                                        {activeChat.avatar}
                                    </div>
                                )}

                                <div className={cn(
                                    "flex flex-col",
                                    isMe ? "items-end" : "items-start"
                                )}>
                                    <div className={cn(
                                        "px-4 py-3 shadow-sm text-sm leading-relaxed relative group",
                                        isMe
                                            ? "bg-gradient-to-br from-brand-600 to-purple-600 text-white rounded-2xl rounded-tr-sm"
                                            : "bg-white dark:bg-dark-surface dark:text-gray-100 text-gray-800 rounded-2xl rounded-tl-sm border border-brand-100 dark:border-brand-800"
                                    )}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-dark-card border-t border-brand-100 dark:border-brand-800/50 shrink-0">
                    <div className="flex items-center gap-2 bg-brand-50 dark:bg-dark-bg px-4 py-2 rounded-2xl border border-brand-200 dark:border-brand-800 transition-colors focus-within:border-brand-400 dark:focus-within:border-brand-600">
                        <button className="p-1.5 text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/50">
                            <Paperclip size={18} />
                        </button>
                        <input
                            type="text"
                            value={msgInput}
                            onChange={(e) => setMsgInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none outline-none text-sm text-brand-900 dark:text-white placeholder:text-brand-400 h-9"
                        />
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/50">
                                <Smile size={18} />
                            </button>
                            <button className="p-1.5 text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/50">
                                <ImageIcon size={18} />
                            </button>
                            <button className={cn(
                                "p-2 ml-1 rounded-xl transition-all shadow-md",
                                msgInput.trim()
                                    ? "bg-brand-600 text-white hover:bg-brand-700 hover:scale-105"
                                    : "bg-brand-200 dark:bg-brand-800 text-brand-400 dark:text-brand-600 cursor-not-allowed"
                            )}>
                                <Send size={16} className={msgInput.trim() ? "ml-0.5" : ""} />
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Right Panel: User Profile (Desktop only) */}
            <div className="w-72 hidden xl:flex flex-col gap-6 shrink-0 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                <Card className="flex flex-col items-center p-6 bg-white dark:bg-dark-card border-brand-100 dark:border-brand-900/50 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-400 to-pink-500 p-1 mb-4 shadow-lg shadow-brand-500/20">
                        <div className="w-full h-full rounded-full bg-white dark:bg-dark-card flex items-center justify-center text-3xl font-bold text-brand-600 dark:text-brand-300">
                            {activeChat.avatar}
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-brand-900 dark:text-white mb-1">{activeChat.name}</h2>
                    <p className="text-sm text-brand-500 dark:text-brand-400 mb-4">{activeChat.role}</p>

                    <div className="flex items-center gap-2 mb-6">
                        <div className={cn("w-2 h-2 rounded-full", activeChat.status === 'online' ? "bg-emerald-500" : "bg-gray-400")} />
                        <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">{activeChat.status}</span>
                    </div>

                    <div className="w-full grid grid-cols-3 gap-2 mb-2">
                        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-brand-50 dark:bg-brand-900/20">
                            <Phone size={16} className="text-brand-600 dark:text-brand-400" />
                            <span className="text-[10px] text-brand-500 dark:text-brand-400 font-medium">Call</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-brand-50 dark:bg-brand-900/20">
                            <Video size={16} className="text-brand-600 dark:text-brand-400" />
                            <span className="text-[10px] text-brand-500 dark:text-brand-400 font-medium">Video</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-brand-50 dark:bg-brand-900/20">
                            <User size={16} className="text-brand-600 dark:text-brand-400" />
                            <span className="text-[10px] text-brand-500 dark:text-brand-400 font-medium">Profile</span>
                        </div>
                    </div>
                </Card>

                <Card className="flex-1 p-4" title="Shared Media">
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-square rounded-lg bg-brand-100 dark:bg-brand-800/50 animate-pulse hover:animate-none transition-all cursor-pointer hover:ring-2 ring-brand-400"></div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
