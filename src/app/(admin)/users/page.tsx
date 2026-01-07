'use client';

import { useRouter } from 'next/navigation';
import { useUsers } from '@/features/users/hooks';
import { UserStatsCards } from '@/features/users/components/UserStatsCards';
import { UserTableToolbar } from '@/features/users/components/UserTableToolbar';
import { UsersTable } from '@/features/users/components/UsersTable';
import { Plus } from 'lucide-react';

export default function UsersPage() {
    const router = useRouter();
    const { users, stats, isLoading, error } = useUsers();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">กำลังโหลดข้อมูลผู้ใช้...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <p className="text-red-600 font-semibold mb-4">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                    <p className="text-slate-500 mb-4">{error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 font-semibold transition-all"
                    >
                        ลองอีกครั้ง
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">บุคคลทั่วไป</h1>
                    <p className="text-slate-500 text-sm md:text-base">จัดการผู้ใช้ทั่วไปในระบบ</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-5 md:px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold touch-target">
                    <Plus size={20} />
                    <span className="hidden sm:inline">เพิ่มผู้ใช้</span>
                    <span className="sm:hidden">เพิ่ม</span>
                </button>
            </div>

            {/* Stats Cards */}
            {stats && <UserStatsCards stats={stats} type="user" />}

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-md border border-sky-100 overflow-hidden">
                <UserTableToolbar searchPlaceholder="ค้นหาผู้ใช้..." />
                <UsersTable
                    users={users}
                    onView={(id) => router.push(`/users/${id}`)}
                    onEmail={(id) => alert(`ส่งอีเมลถึง User ID: ${id}`)}
                    onDelete={(id) => {
                        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
                            console.log('Delete user:', id);
                        }
                    }}
                />

                {/* Pagination */}
                <div className="p-4 md:p-6 border-t border-sky-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-slate-500 font-medium text-center sm:text-left">
                        แสดง 1-{users.length} {stats && `จาก ${stats.total.toLocaleString('th-TH')} รายการ`}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <button className="px-3 md:px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white disabled:opacity-50 font-semibold transition-all touch-target" disabled>
                            ก่อนหน้า
                        </button>
                        <button className="px-3 md:px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-semibold shadow-sm min-w-[40px]">1</button>
                        <button className="px-3 md:px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white font-semibold transition-all min-w-[40px]">2</button>
                        <button className="px-3 md:px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white font-semibold transition-all min-w-[40px]">3</button>
                        <button className="px-3 md:px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white font-semibold transition-all touch-target">
                            ถัดไป
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
