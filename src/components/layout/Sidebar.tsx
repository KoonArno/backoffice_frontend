'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CreditCard,
    Award,
    HelpCircle,
    Settings,
    History,
    ChevronDown,
    Plus,
    Tags,
    FileText,
    Ticket,
    MessageSquare,
    Mail,
    CreditCard as PaymentIcon,
    Shield,
    UserCog,
    Video,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface MenuItem {
    name: string;
    href?: string;
    icon: React.ReactNode;
    children?: { name: string; href: string }[];
}

const menuItems: MenuItem[] = [
    {
        name: 'แดชบอร์ด',
        href: '/',
        icon: <LayoutDashboard size={20} />,
    },
    {
        name: 'ผู้ใช้งาน',
        icon: <Users size={20} />,
        children: [
            { name: 'บุคคลทั่วไป', href: '/users' },
            { name: 'เภสัชกร', href: '/users/pharmacists' },
        ],
    },
    {
        name: 'คอร์สเรียน',
        icon: <BookOpen size={20} />,
        children: [
            { name: 'คอร์สทั้งหมด', href: '/courses' },
            { name: 'เพิ่มคอร์สเรียน', href: '/courses/add' },
            { name: 'หมวดหมู่และแท็ก', href: '/courses/categories' },
        ],
    },
    {
        name: 'คลังวิดีโอ',
        href: '/videos',
        icon: <Video size={20} />,
    },
    {
        name: 'การเงิน',
        icon: <CreditCard size={20} />,
        children: [
            { name: 'คำสั่งซื้อ', href: '/payments/orders' },
            { name: 'รายการธุรกรรม', href: '/payments/transactions' },
            { name: 'คูปองส่วนลด', href: '/payments/coupons' },
        ],
    },
    {
        name: 'จัดการ CPE Credit',
        href: '/cpe-credits',
        icon: <Award size={20} />,
    },
    {
        name: 'ประวัติการใช้งาน',
        href: '/audit-logs',
        icon: <History size={20} />,
    },
];

function MenuItemComponent({ item, isCollapsed }: { item: MenuItem; isCollapsed: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = item.href === pathname || item.children?.some(child => child.href === pathname);

    // ปิด submenu อัตโนมัติเมื่อย่อ sidebar
    useEffect(() => {
        if (isCollapsed) {
            setIsOpen(false);
        }
    }, [isCollapsed]);

    if (item.children) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        'w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                        isActive
                            ? 'bg-white/25 text-white shadow-lg backdrop-blur-md border border-white/30'
                            : 'text-white/80 hover:bg-white/15 hover:text-white hover:shadow-md',
                        isCollapsed && 'justify-center'
                    )}
                    title={isCollapsed ? item.name : undefined}
                >
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            'transition-transform',
                            isActive && 'scale-110'
                        )}>
                            {item.icon}
                        </div>
                        {!isCollapsed && <span>{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                        <ChevronDown
                            size={18}
                            className={clsx('transition-transform duration-300', isOpen && 'rotate-180')}
                        />
                    )}
                </button>
                {isOpen && !isCollapsed && (
                    <div className="mt-2 ml-6 space-y-1 animate-slide-in">
                        {item.children.map((child) => (
                            <Link
                                key={child.href}
                                href={child.href}
                                className={clsx(
                                    'block px-4 py-2.5 text-sm rounded-lg transition-all duration-200',
                                    pathname === child.href
                                        ? 'bg-white/20 text-white font-medium shadow-md backdrop-blur-sm border border-white/30'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white hover:pl-5'
                                )}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={item.href!}
            className={clsx(
                'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group',
                isActive
                    ? 'bg-white/25 text-white shadow-lg backdrop-blur-md border border-white/30'
                    : 'text-white/80 hover:bg-white/15 hover:text-white hover:shadow-md',
                isCollapsed && 'justify-center'
            )}
            title={isCollapsed ? item.name : undefined}
        >
            <div className={clsx(
                'transition-transform',
                isActive ? 'scale-110' : 'group-hover:scale-110'
            )}>
                {item.icon}
            </div>
            {!isCollapsed && <span>{item.name}</span>}
        </Link>
    );
}

export default function Sidebar() {
    // State สำหรับจัดการการย่อ-ขยาย พร้อม localStorage
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebar-collapsed');
            return saved === 'true';
        }
        return false;
    });

    // บันทึกสถานะลง localStorage เมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', String(isCollapsed));
        // ส่ง event เพื่อแจ้งให้ components อื่นรู้ว่า sidebar เปลี่ยนสถานะ
        window.dispatchEvent(new Event('sidebar-toggle'));
    }, [isCollapsed]);

    return (
        <aside className={clsx(
            "fixed left-0 top-0 h-screen flex flex-col z-50 bg-gradient-to-b from-sky-500 to-sky-600 shadow-2xl transition-all duration-300",
            isCollapsed ? 'w-[80px]' : 'w-[280px]'
        )}>
            {/* Logo */}
            <div className="h-[72px] flex items-center justify-between px-6 border-b border-white/20 backdrop-blur-sm">
                <div className={clsx(
                    "flex items-center gap-3 transition-all duration-300",
                    isCollapsed && "justify-center w-full"
                )}>
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/30 hover:scale-110 transition-transform">
                        <BookOpen size={22} className="text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden">
                            <span className="text-white font-bold text-xl tracking-tight block">Pharmacy LMS</span>
                            <span className="text-white/70 text-xs">ระบบจัดการเรียนรู้</span>
                        </div>
                    )}
                </div>
                {!isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all text-white/80 hover:text-white"
                        aria-label="ย่อ sidebar"
                        title="ย่อ sidebar"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
            </div>

            {/* ปุ่มขยาย (แสดงเมื่อย่ออยู่) */}
            {isCollapsed && (
                <div className="flex justify-center py-3 border-b border-white/20">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-all text-white/80 hover:text-white"
                        aria-label="ขยาย sidebar"
                        title="ขยาย sidebar"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <MenuItemComponent key={item.name} item={item} isCollapsed={isCollapsed} />
                    ))}
                </div>
            </nav>
        </aside>
    );
}
