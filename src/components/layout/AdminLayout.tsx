'use client';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useState, useEffect } from 'react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    // ดึงสถานะ sidebar จาก localStorage
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        // อ่านค่าจาก localStorage
        const savedState = localStorage.getItem('sidebar-collapsed');
        setIsCollapsed(savedState === 'true');

        // ฟังการเปลี่ยนแปลงของ localStorage
        const handleStorageChange = () => {
            const newState = localStorage.getItem('sidebar-collapsed');
            setIsCollapsed(newState === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        
        // ใช้ custom event สำหรับการเปลี่ยนแปลงภายใน tab เดียวกัน
        const handleCustomEvent = () => {
            const newState = localStorage.getItem('sidebar-collapsed');
            setIsCollapsed(newState === 'true');
        };

        window.addEventListener('sidebar-toggle', handleCustomEvent);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('sidebar-toggle', handleCustomEvent);
        };
    }, []);

    return (
        <div className="min-h-screen bg-sky-50/50">
            <Sidebar />
            <Topbar />
            <main className={`pt-[72px] p-8 transition-all duration-300 ${
                isCollapsed ? 'ml-[80px]' : 'ml-[280px]'
            }`}>
                {children}
            </main>
        </div>
    );
}
