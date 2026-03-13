'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, AlertCircle } from 'lucide-react';
import { apiClient } from '@/services/api/client';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { parseDbDate } from '@/utils/date';

interface AdminUser {
    id: string;
    username: string;
    email: string;
    role: string;
    department?: string;
    major?: string;
    createAt: string;
}

export default function AdminsPage() {
    const router = useRouter();
    const [admins, setAdmins] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchAdmins = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get<{ users: AdminUser[] }>('/admin/users');
            setAdmins(response.data?.users || []);
            setError(null);
        } catch (error: unknown) {
            console.error('Failed to fetch admins:', error);
            const err = error as Error;
            setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const confirmDelete = async () => {
        if (!adminToDelete) return;

        try {
            setIsDeleting(true);
            await apiClient.delete(`/admin/users/${adminToDelete.id}`);
            setAdmins(prev => prev.filter(admin => admin.id !== adminToDelete.id));
            setAdminToDelete(null);
            alert('ลบผู้ดูแลระบบสำเร็จ');
        } catch (error: unknown) {
            console.error('Failed to delete admin:', error);
            const err = error as Error;
            alert(err.message || 'เกิดข้อผิดพลาดในการลบ');
            // If we want to keep the modal open on error, don't setAdminToDelete(null) here
            // But usually, it's safer to close it or show an error state
            setAdminToDelete(null); // Optional: close modal even on error to reset state
        } finally {
            setIsDeleting(false);
        }
    };

    if (error) {
        return (
             <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <p className="text-red-600 font-semibold mb-4">เกิดข้อผิดพลาด</p>
                    <p className="text-slate-500 mb-4">{error}</p>
                    <button
                        onClick={fetchAdmins}
                        className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 font-semibold transition-all"
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
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1 flex items-center gap-3">
                        ผู้ดูแลระบบ
                        {isLoading && (
                            <span className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
                        )}
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base">จัดการบัญชีและสิทธิ์ของผู้ดูแลระบบ</p>
                </div>
                <button 
                    onClick={() => router.push('/users/admins/add')}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 md:px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold touch-target"
                >
                    <Plus size={20} />
                    <span className="hidden sm:inline">เพิ่มผู้ดูแลระบบ</span>
                    <span className="sm:hidden">เพิ่ม</span>
                </button>
            </div>

            {/* Table */}
            <div className={`bg-white rounded-2xl shadow-md border border-indigo-100 overflow-hidden transition-opacity duration-200 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-indigo-100 text-sm font-semibold text-slate-600">
                                <th className="px-6 py-4 whitespace-nowrap">ชื่อผู้ใช้ / อีเมล</th>
                                <th className="px-6 py-4 whitespace-nowrap">ระดับสิทธิ์</th>
                                <th className="px-6 py-4 whitespace-nowrap">แผนก / สาขา</th>
                                <th className="px-6 py-4 whitespace-nowrap">วันที่สร้าง</th>
                                <th className="px-6 py-4 text-right whitespace-nowrap">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-50">
                            {admins.length === 0 && !isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        ไม่มีข้อมูลผู้ดูแลระบบ
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                    {admin.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-800">{admin.username}</div>
                                                    <div className="text-sm text-slate-500">{admin.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                (admin.role === 'super_admin' || admin.role === 'admin')
                                                    ? 'bg-sky-100 text-sky-700 border border-sky-200' 
                                                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                            }`}>
                                                {(admin.role === 'super_admin' || admin.role === 'admin') ? 'Admin' : 'Officer'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <div className="text-sm text-slate-700 font-medium">{admin.department || '-'}</div>
                                            <div className="text-xs text-slate-500">{admin.major || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-sm text-slate-500">
                                            {format(parseDbDate(admin.createAt), 'dd MMM yyyy HH:mm', { locale: th })}
                                        </td>
                                        <td className="px-6 py-4 align-middle text-right">
                                            <button 
                                                onClick={() => setAdminToDelete(admin)}
                                                className="text-red-500 hover:text-red-600 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                ลบ
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-4 md:p-6 border-t border-indigo-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-sm text-slate-500 font-medium text-center sm:text-left">
                        จำนวนผู้ดูแลระบบทั้งหมด {admins.length} บัญชี
                    </p>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {adminToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle size={32} className="text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                ยืนยันการลบผู้ดูแลระบบ
                            </h3>
                            <p className="text-slate-500 mb-6">
                                คุณแน่ใจหรือไม่ว่าต้องการลบบัญชี <span className="font-semibold text-slate-700">{adminToDelete.username}</span> ?
                                การดำเนินการนี้ไม่สามารถยกเลิกได้
                            </p>
                        </div>
                        <div className="flex bg-slate-50 p-4 border-t border-slate-100 gap-3">
                            <button
                                onClick={() => setAdminToDelete(null)}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all disabled:opacity-50"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 font-semibold transition-all flex justify-center items-center gap-2 shadow-sm shadow-red-200 hover:shadow-md hover:shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>กำลังลบ...</span>
                                    </>
                                ) : (
                                    <span>ลบข้อมูล</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

