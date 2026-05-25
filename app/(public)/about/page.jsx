'use client'
import React from 'react';
import { Users, Target, ShieldCheck, Zap } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Matching Homepage Hero style */}
            <div className="mx-6">
                <div className="bg-teal-200 rounded-3xl py-20 px-6 max-w-7xl mx-auto text-center mt-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                        Empowering Small Businesses to <span className="text-teal-600">Scale</span>
                    </h1>
                    <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
                        Marketly is more than just an e-commerce platform. We are a community-driven marketplace 
                        designed to bridge the gap between talented creators and conscious consumers.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
                        <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                            Founded in 2024, Marketly was built on the belief that everyone deserves a fair shot 
                            at digital success. We provide the tools, the audience, and the infrastructure so 
                            you can focus on what you do best: creating amazing products.
                        </p>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Our goal is to reach 10,000 independent sellers by 2026, providing them with the 
                            same powerful tools used by the world's largest retail giants.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100 text-center hover:shadow-lg transition group">
                            <Users className="mx-auto text-teal-600 mb-4 group-hover:scale-110 transition" size={32} />
                            <h3 className="text-2xl font-bold text-slate-800">5,000+</h3>
                            <p className="text-sm text-slate-600 font-medium">Active Sellers</p>
                        </div>
                        <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 text-center hover:shadow-lg transition group">
                            <Target className="mx-auto text-indigo-600 mb-4 group-hover:scale-110 transition" size={32} />
                            <h3 className="text-2xl font-bold text-slate-800">200k+</h3>
                            <p className="text-sm text-slate-600 font-medium">Monthly Users</p>
                        </div>
                        <div className="p-8 bg-pink-50 rounded-2xl border border-pink-100 text-center hover:shadow-lg transition group">
                            <ShieldCheck className="mx-auto text-pink-600 mb-4 group-hover:scale-110 transition" size={32} />
                            <h3 className="text-2xl font-bold text-slate-800">100%</h3>
                            <p className="text-sm text-slate-600 font-medium">Secure Payments</p>
                        </div>
                        <div className="p-8 bg-amber-50 rounded-2xl border border-amber-100 text-center hover:shadow-lg transition group">
                            <Zap className="mx-auto text-amber-600 mb-4 group-hover:scale-110 transition" size={32} />
                            <h3 className="text-2xl font-bold text-slate-800">24/7</h3>
                            <p className="text-sm text-slate-600 font-medium">Dedicated Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us - Updated with Requested Content and Home Colors */}
            <div className="bg-slate-50 py-24 px-6 border-y border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Marketly?</h2>
                        <p className="text-slate-600 text-lg">The modern choice for the modern entrepreneur.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 01 Zero Complexity */}
                        <div className="relative bg-white p-8 rounded-2xl border border-slate-200 group hover:border-teal-500 transition shadow-sm">
                            <div className="absolute -top-5 left-8 bg-teal-600 text-white size-12 flex items-center justify-center rounded-xl font-bold text-xl shadow-lg">
                                01
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mt-4 mb-3">Zero Complexity</h4>
                            <p className="text-slate-600 leading-relaxed">
                                Set up your store in under 5 minutes with our intuitive dashboard. No coding required.
                            </p>
                        </div>

                        {/* 02 Real-time Analytics */}
                        <div className="relative bg-white p-8 rounded-2xl border border-slate-200 group hover:border-indigo-500 transition shadow-sm">
                            <div className="absolute -top-5 left-8 bg-indigo-600 text-white size-12 flex items-center justify-center rounded-xl font-bold text-xl shadow-lg">
                                02
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mt-4 mb-3">Real-time Analytics</h4>
                            <p className="text-slate-600 leading-relaxed">
                                Track every sale and visitor with built-in visualization tools to help you grow faster.
                            </p>
                        </div>

                        {/* 03 Sellers First */}
                        <div className="relative bg-white p-8 rounded-2xl border border-slate-200 group hover:border-amber-500 transition shadow-sm">
                            <div className="absolute -top-5 left-8 bg-amber-600 text-white size-12 flex items-center justify-center rounded-xl font-bold text-xl shadow-lg">
                                03
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mt-4 mb-3">Sellers First</h4>
                            <p className="text-slate-600 leading-relaxed">
                                We keep our commissions low so you can keep more of what you earn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
