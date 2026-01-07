'use client';

import { Bell, Search, Menu, Moon, Sun, User } from 'lucide-react';
import { useState } from 'react';

export default function Topbar() {
    const [isDark, setIsDark] = useState(false);

    return (
        <header className="fixed top-0 left-[280px] right-0 h-[72px] bg-white/80 backdrop-blur-xl border-b border-sky-100 z-40 flex items-center justify-between px-8 shadow-sm">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2.5 hover:bg-sky-50 rounded-xl transition-all">
                    <Menu size={22} className="text-slate-600" />
                </button>

                {/* Search */}
                <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl px-5 py-3 w-96 border border-sky-100 hover:border-sky-200 transition-all focus-within:ring-2 focus-within:ring-sky-200">
                    <Search size={20} className="text-sky-500" />
                    <input
                        type="text"
                        placeholder="ค้นหาคอร์ส, ผู้ใช้งาน, หรือรายการ..."
                        className="bg-transparent border-none outline-none text-sm flex-1 text-slate-700 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-3 hover:bg-sky-50 rounded-xl transition-all hover:scale-110 group"
                >
                    {isDark ? (
                        <Sun size={22} className="text-slate-600 group-hover:text-sky-500 transition-colors" />
                    ) : (
                        <Moon size={22} className="text-slate-600 group-hover:text-sky-500 transition-colors" />
                    )}
                </button>

                {/* Notifications */}
                <button className="relative p-3 hover:bg-sky-50 rounded-xl transition-all hover:scale-110 group">
                    <Bell size={22} className="text-slate-600 group-hover:text-sky-500 transition-colors" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></span>
                </button>

                {/* User Menu */}
                <button className="flex items-center gap-3 p-2 pl-3 pr-4 hover:bg-sky-50 rounded-2xl transition-all group border border-transparent hover:border-sky-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-all">
                        A
                    </div>
                    <div className="text-left hidden xl:block">
                        <p className="text-sm font-semibold text-slate-700">ผู้ดูแลระบบ</p>
                        <p className="text-xs text-slate-500">Admin</p>
                    </div>
                </button>
            </div>
        </header>
    );
}
