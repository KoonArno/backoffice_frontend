'use client';

import { useEffect, useState } from 'react';
import { Plus, Tag, Edit, Trash2 } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categoryService } from '@/features/courses/services/categoryService';
import type { Category } from '@/features/courses/types/categories';

export default function CategoriesPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryService.getCategories();
            setCategories(data);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="กำลังโหลด..." fullScreen />;
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-1">หมวดหมู่คอร์ส</h1>
                    <p className="text-slate-500">จัดการหมวดหมู่และหมวดหมู่ย่อยของคอร์สเรียน</p>
                </div>
                <Link
                    href="/courses/categories/add"
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all font-semibold text-sm"
                >
                    <Plus size={18} />
                    เพิ่มหมวดหมู่
                </Link>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-2xl shadow-md border border-violet-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-slate-50 to-violet-50 border-b border-violet-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wide">ชื่อหมวดหมู่</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wide">คำอธิบาย</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wide">หมวดหมู่ย่อย</th>
                                <th className="text-center px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wide">จำนวนคอร์ส</th>
                                <th className="text-right px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wide">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="hover:bg-violet-50/30 transition-colors cursor-pointer"
                                    onClick={() => router.push(`/courses/categories/${category.id}`)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 bg-${category.color}-500 rounded-lg flex items-center justify-center`}>
                                                <Tag size={20} className="text-white" />
                                            </div>
                                            <span className="font-semibold text-slate-800">{category.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-600">{category.description}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {category.subcategories.slice(0, 2).map((sub) => (
                                                <span key={sub.id} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                                                    {sub.name}
                                                </span>
                                            ))}
                                            {category.subcategories.length > 2 && (
                                                <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-xs font-medium">
                                                    +{category.subcategories.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
                                            {category.courseCount} คอร์ส
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                className="p-2.5 hover:bg-blue-100 rounded-xl transition-all group"
                                                title="แก้ไข"
                                                onClick={() => router.push(`/courses/categories/${category.id}/edit`)}
                                            >
                                                <Edit size={18} className="text-slate-500 group-hover:text-blue-600" />
                                            </button>
                                            <button
                                                className="p-2.5 hover:bg-red-100 rounded-xl transition-all group"
                                                title="ลบ"
                                                onClick={() => confirm('คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?') && console.log('Delete', category.id)}
                                            >
                                                <Trash2 size={18} className="text-slate-500 group-hover:text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
