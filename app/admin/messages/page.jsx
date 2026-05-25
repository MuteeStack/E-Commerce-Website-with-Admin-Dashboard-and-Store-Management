'use client'
import React, { useEffect, useState } from 'react';
import { getAllContactMessages, dbUpdate } from '@/lib/firebaseDb';
import { Mail, User, Calendar, MessageSquare, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const data = await getAllContactMessages();
            // Sort by date descending
            const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setMessages(sorted);
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to load messages");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const markAsRead = async (id) => {
        try {
            await dbUpdate(`contactMessages/${id}`, { status: 'read' });
            setMessages(messages.map(msg => msg.id === id ? { ...msg, status: 'read' } : msg));
            toast.success("Marked as read");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Contact Messages</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage inquiries from your customers</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600">
                    Total: {messages.length}
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-20 text-center">
                    <MessageSquare className="mx-auto text-slate-300 mb-4" size={48} />
                    <p className="text-slate-500 font-medium">No messages found</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`bg-white rounded-2xl border transition p-6 shadow-sm ${msg.status === 'unread' ? 'border-teal-200 ring-1 ring-teal-50' : 'border-slate-100 opacity-80'}`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-wrap items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                            <User size={16} className="text-slate-400" />
                                            {msg.name}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Mail size={16} className="text-slate-400" />
                                            {msg.email}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Calendar size={16} className="text-slate-400" />
                                            {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        {msg.status === 'unread' && (
                                            <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                                Unread
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-2">{msg.subject}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap italic bg-slate-50 p-4 rounded-xl">
                                            "{msg.message}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2">
                                    {msg.status === 'unread' && (
                                        <button 
                                            onClick={() => markAsRead(msg.id)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition shadow-md shadow-teal-100"
                                        >
                                            <CheckCircle size={14} />
                                            Mark Read
                                        </button>
                                    )}
                                    <a 
                                        href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900 transition shadow-md shadow-slate-100"
                                    >
                                        Reply
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
