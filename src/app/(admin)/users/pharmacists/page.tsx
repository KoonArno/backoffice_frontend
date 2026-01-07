'use client';

import { useRouter } from 'next/navigation';
import { usePharmacists } from '@/features/users/hooks';
import { UserStatsCards } from '@/features/users/components/UserStatsCards';
import { UserTableToolbar } from '@/features/users/components/UserTableToolbar';
import { PharmacistsTable } from '@/features/users/components/PharmacistsTable';
import { Plus } from 'lucide-react';

export default function PharmacistsPage() {
    const router = useRouter();
    const { pharmacists, stats, isLoading, error } = usePharmacists();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">กำลังโหลดข้อมูลเภสัชกร...</p>
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
                        className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-semibold transition-all"
                    >
                        ลองอีกครั้ง
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-1">เภสัชกร</h1>
                    <p className="text-slate-500">จัดการเภสัชกรในระบบ</p>
                </div>
                <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold">
                    <Plus size={20} />
                    <span>เพิ่มเภสัชกร</span>
                </button>
            </div>

            {/* Stats Cards */}
            {stats && <UserStatsCards stats={stats} type="pharmacist" />}

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-md border border-emerald-100 overflow-hidden">
                <UserTableToolbar searchPlaceholder="ค้นหาเภสัชกร หรือ เลขใบประกอบวิชาชีพ..." />
                <PharmacistsTable
                    pharmacists={pharmacists}
                    onView={(id) => router.push(`/users/pharmacists/${id}`)}
                    onEmail={(id) => alert(`ส่งอีเมลถึง Pharmacist ID: ${id}`)}
                />

                {/* Pagination */}
                <div className="p-6 border-t border-emerald-100 bg-slate-50 flex items-center justify-between">
                    <p className="text-sm text-slate-500 font-medium">
                        แสดง 1-{pharmacists.length} {stats && `จาก ${stats.total.toLocaleString('th-TH')} รายการ`}
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white disabled:opacity-50 font-semibold transition-all" disabled>
                            ก่อนหน้า
                        </button>
                        <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-sm">1</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white font-semibold transition-all">2</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white font-semibold transition-all">3</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm hover:bg-white font-semibold transition-all">
                            ถัดไป
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
