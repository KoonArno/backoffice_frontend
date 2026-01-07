'use client';

import { use, useEffect, useState } from 'react';
import { ArrowLeft, Tag, Filter } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { categoryService } from '@/features/courses/services/categoryService';
import { courseService } from '@/features/courses/services/courseService';
import type { Category } from '@/features/courses/types/categories';
import type { Course } from '@/features/courses/types';

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [category, setCategory] = useState<Category | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            const cat = await categoryService.getCategoryById(id);
            setCategory(cat);

            // Load all courses and filter by category
            const { courses: allCourses } = await courseService.getCourses();
            const filtered = allCourses.filter(c => c.category === cat?.name);
            setCourses(filtered);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="กำลังโหลด..." fullScreen />;
    }

    if (!category) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-500">ไม่พบหมวดหมู่</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link
                href="/courses/categories"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors font-medium"
            >
                <ArrowLeft size={20} />
                กลับไปหน้าหมวดหมู่
            </Link>

            {/* Category Hero */}
            <div className={`bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-2xl shadow-xl p-8 text-white`}>
                <div className="flex items-start gap-6">
                    <div className={`w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30`}>
                        <Tag size={40} className="text-white" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                        <p className="text-white/90 mb-4">{category.description}</p>
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-white/70 text-sm">จำนวนคอร์ส</p>
                                <p className="text-2xl font-bold">{category.courseCount}</p>
                            </div>
                            <div>
                                <p className="text-white/70 text-sm">หมวดหมู่ย่อย</p>
                                <p className="text-2xl font-bold">{category.subcategories.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subcategory Filter */}
            <div className="bg-white rounded-2xl shadow-md border border-violet-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Filter size={20} className="text-violet-500" />
                    <h2 className="text-lg font-bold text-slate-800">กรองตามหมวดหมู่ย่อย</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedSubcategory(null)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${selectedSubcategory === null
                            ? 'bg-violet-500 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        ทั้งหมด ({courses.length})
                    </button>
                    {category.subcategories.map((sub) => (
                        <button
                            key={sub.id}
                            onClick={() => setSelectedSubcategory(sub.id)}
                            className={`px-4 py-2 rounded-xl font-semibold transition-all ${selectedSubcategory === sub.id
                                ? 'bg-violet-500 text-white shadow-md'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            {sub.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Link
                        key={course.id}
                        href={`/courses/${course.id}`}
                        className="bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all overflow-hidden group"
                    >
                        <div className="p-6">
                            <h3 className="font-bold text-slate-800 mb-2 group-hover:text-violet-600 transition-colors">
                                {course.title}
                            </h3>
                            <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                                <span>{course.cpeCredits ?? 0} CPE Credits</span>
                                <span>฿{(course.price ?? 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-amber-500">
                                    <span>⭐</span>
                                    <span className="font-semibold">{course.rating ?? 0}</span>
                                </div>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-600 text-sm">{(course.enrollmentsCount ?? 0).toLocaleString()} คน</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {courses.length === 0 && (
                <div className="bg-slate-50 rounded-xl p-12 text-center">
                    <p className="text-slate-500">ยังไม่มีคอร์สในหมวดหมู่นี้</p>
                </div>
            )}
        </div>
    );
}
