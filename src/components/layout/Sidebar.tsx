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
    Video
} from 'lucide-react';
import { useState } from 'react';
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

function MenuItemComponent({ item }: { item: MenuItem }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = item.href === pathname || item.children?.some(child => child.href === pathname);

    if (item.children) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        'w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                        isActive
                            ? 'bg-white/25 text-white shadow-lg backdrop-blur-md border border-white/30'
                            : 'text-white/80 hover:bg-white/15 hover:text-white hover:shadow-md'
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            'transition-transform',
                            isActive && 'scale-110'
                        )}>
                            {item.icon}
                        </div>
                        <span>{item.name}</span>
                    </div>
                    <ChevronDown
                        size={18}
                        className={clsx('transition-transform duration-300', isOpen && 'rotate-180')}
                    />
                </button>
                {isOpen && (
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
                    : 'text-white/80 hover:bg-white/15 hover:text-white hover:shadow-md'
            )}
        >
            <div className={clsx(
                'transition-transform',
                isActive ? 'scale-110' : 'group-hover:scale-110'
            )}>
                {item.icon}
            </div>
            <span>{item.name}</span>
        </Link>
    );
}

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-[280px] flex flex-col z-50 bg-gradient-to-b from-sky-500 to-sky-600 shadow-2xl">
            {/* Logo */}
            <div className="h-[72px] flex items-center px-6 border-b border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/30 hover:scale-110 transition-transform">
                        <BookOpen size={22} className="text-white" />
                    </div>
                    <div>
                        <span className="text-white font-bold text-xl tracking-tight block">Pharmacy LMS</span>
                        <span className="text-white/70 text-xs">ระบบจัดการเรียนรู้</span>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <MenuItemComponent key={item.name} item={item} />
                    ))}
                </div>
            </nav>

            {/* User */}
            <div className="p-4 mt-auto border-t border-white/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer border border-white/20">
                    <div className="w-11 h-11 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white/40">
                        A
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">ผู้ดูแลระบบ</p>
                        <p className="text-xs text-white/70 truncate">Super Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
