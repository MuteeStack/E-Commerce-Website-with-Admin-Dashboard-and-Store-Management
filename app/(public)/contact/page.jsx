'use client'
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { createContactMessage } from '@/lib/firebaseDb';

const ContactPage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createContactMessage({
                ...formData,
                userId: user?.uid || null,
                status: 'unread'
            });
            toast.success("Message sent! We'll get back to you soon.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error("Failed to send message. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h1>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Have questions about setting up your store or a recent order? Our team is here to help you 24/7.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <MessageSquare className="text-teal-600" size={24} />
                                Contact Info
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-teal-50 p-3 rounded-lg text-teal-600">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Email Us</p>
                                        <p className="text-slate-600 text-sm">support@marketly.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Call Us</p>
                                        <p className="text-slate-600 text-sm">+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Our Office</p>
                                        <p className="text-slate-600 text-sm">123 E-Commerce Way, Tech City, CA 94103</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-teal-600 p-8 rounded-2xl text-white">
                            <h4 className="font-bold text-lg mb-2">Want to Sell?</h4>
                            <p className="text-teal-100 text-sm mb-4">Join 5,000+ merchants and start selling your products today.</p>
                            <Link 
                                href={user ? "/create-store" : "#"} 
                                onClick={(e) => {
                                    if (!user) {
                                        e.preventDefault();
                                        toast.error("first sign up then create store");
                                    }
                                }}
                                className="block w-full py-3 bg-white text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition text-center"
                            >
                                Open Your Store
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-500 transition" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-500 transition" 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Subject</label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-500 transition" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Message</label>
                                <textarea 
                                    rows="5"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message here..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-500 transition resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="flex items-center justify-center gap-2 w-full md:w-max px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
