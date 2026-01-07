import { apiClient } from '@/services/api/client';
import type { CoursesData, CategoriesData, CourseStatus } from '../types';
import { VideoProvider } from '../../videos/types';

export const courseService = {
    /**
     * Fetch all courses with stats
     */
    async getCourses(): Promise<CoursesData> {
        try {
            // In production: const response = await apiClient.get<CoursesData>('/courses');

            // Mock data with number IDs (matching database schema)
            return {
                courses: [
                    {
                        id: 1,
                        title: 'การดูแลผู้ป่วยโรคเรื้อรัง',
                        category: 'วิทยาลัยเภสัชบำบัด',
                        categoryId: 1,
                        price: 500,
                        enrollments: 1245,
                        rating: 4.9,
                        status: 'published' as CourseStatus,
                        cpeCredits: 3,
                        createdAt: '2024-01-15',
                        lessonsCount: 12,
                        description: 'เรียนรู้วิธีการดูแลผู้ป่วยโรคเรื้อรังอย่างถูกต้องและมีประสิทธิภาพ',
                        previewVideo: {
                            id: 101,
                            name: 'แนะนำคอร์ส: การดูแลผู้ป่วยโรคเรื้อรัง',
                            provider: VideoProvider.VIMEO,
                            resourceId: '987654321', // Mock ID
                            duration: 180,
                            createdAt: '2024-01-01',
                            categoryId: '1'
                        },
                        lessons: [
                            { id: 1, title: 'บทนำ: ความเข้าใจเบื้องต้น', duration: '15:00', videoId: 102 },
                            { id: 2, title: 'การประเมินอาการผู้ป่วย', duration: '20:00', videoId: 103 },
                            { id: 3, title: 'การใช้ยาในผู้ป่วยโรคเรื้อรัง', duration: '25:00', videoId: 104 },
                        ]
                    },
                    {
                        id: 2,
                        title: 'เภสัชกรรมคลินิกขั้นสูง',
                        category: 'วิทยาลัยเภสัชบำบัด',
                        categoryId: 1,
                        price: 800,
                        enrollments: 987,
                        rating: 4.8,
                        status: 'published' as CourseStatus,
                        cpeCredits: 5,
                        createdAt: '2024-01-20',
                        lessonsCount: 8,
                        description: 'ยกระดับตวามรู้ด้านเภสัชกรรมคลิกนิกสู่ระดับสากล',
                        previewVideo: {
                            id: 201,
                            name: 'แนะนำคอร์ส: เภสัชกรรมคลินิกขั้นสูง',
                            provider: VideoProvider.VIMEO,
                            resourceId: '987654322',
                            duration: 240,
                            createdAt: '2024-01-01',
                            categoryId: '1'
                        },
                        lessons: [
                            { id: 4, title: 'แนวใหม่ในการดูแลผู้ป่วย', duration: '30:00', videoId: 202 },
                            { id: 5, title: 'กรณีศึกษาทางคลินิก', duration: '45:00', videoId: 203 },
                        ]
                    },
                    {
                        id: 3,
                        title: 'กฎหมายเภสัชกรรม 2024',
                        category: 'วิทยาลัยคุ้มครองผู้บริโภคด้านยาฯ',
                        categoryId: 2,
                        price: 400,
                        enrollments: 856,
                        rating: 4.7,
                        status: 'published' as CourseStatus,
                        cpeCredits: 2,
                        createdAt: '2024-02-01',
                        lessonsCount: 5,
                        description: 'อัพเดทกฎหมายเภสัชกรรมใหม่ล่าสุดปี 2024'
                    },
                    {
                        id: 4,
                        title: 'ทักษะการสื่อสารกับผู้ป่วย',
                        category: 'วิทยาลัยเภสัชกรรมชุมชน',
                        categoryId: 5,
                        price: 350,
                        enrollments: 654,
                        rating: 4.6,
                        status: 'draft' as CourseStatus,
                        cpeCredits: 2,
                        createdAt: '2024-02-10',
                        lessonsCount: 6,
                        description: 'พัฒนาทักษะการสื่อสารเพื่อความเข้าใจที่ดีขึ้น'
                    },
                    {
                        id: 5,
                        title: 'เภสัชกรรมชุมชนยุคใหม่',
                        category: 'วิทยาลัยเภสัชกรรมชุมชน',
                        categoryId: 5,
                        price: 600,
                        enrollments: 521,
                        rating: 4.5,
                        status: 'published' as CourseStatus,
                        cpeCredits: 4,
                        createdAt: '2024-02-15',
                        lessonsCount: 10,
                        description: 'บริหารจัดการร้านยายุกใหม่ให้ประสบความสำเร็จ'
                    },
                    {
                        id: 6,
                        title: 'สมุนไพรไทยรักษาโรค',
                        category: 'วิทยาลัยเภสัชกรรมสมุนไพร',
                        categoryId: 3,
                        price: 450,
                        enrollments: 423,
                        rating: 4.4,
                        status: 'published' as CourseStatus,
                        cpeCredits: 3,
                        createdAt: '2024-02-20',
                        lessonsCount: 8,
                        description: 'เรียนรู้สรรพคุณสมุนไพรไทยและการนำไปใช้จริง'
                    },
                ],
                stats: {
                    total: 156,
                    published: 128,
                    draft: 21,
                    totalRevenue: 2400000,
                },
            };
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            throw error;
        }
    },

    /**
     * Get a single course by ID
     */
    async getCourse(id: number | string): Promise<any> {
        try {
            // Mock implementation: find in the mocked list
            const data = await this.getCourses();
            const course = data.courses.find(c => c.id.toString() === id.toString());

            if (!course) {
                throw new Error('Course not found');
            }

            return course;
        } catch (error) {
            console.error('Failed to fetch course details:', error);
            throw error;
        }
    },

    /**
     * Get courses by category ID
     */
    async getCoursesByCategory(categoryId: string): Promise<any[]> {
        try {
            // Mock implementation: filter the mocked list
            const data = await this.getCourses();
            // Note: In real DB, categoryId might be number, here we handle both just in case
            return data.courses.filter(c => c.categoryId?.toString() === categoryId);
        } catch (error) {
            console.error('Failed to fetch courses by category:', error);
            throw error;
        }
    },

    /**
    * Fetch categories
    */
    async getCategories(): Promise<CategoriesData> {
        try {
            // Mock data with number IDs
            return {
                categories: [
                    { id: 1, name: 'วิทยาลัยเภสัชบำบัด', description: 'คอร์สเกี่ยวกับการบำบัดทางเภสัชกรรม', courseCount: 2 },
                    { id: 2, name: 'วิทยาลัยคุ้มครองผู้บริโภคด้านยาฯ', description: 'คอร์สเกี่ยวกับการคุ้มครองผู้บริโภค', courseCount: 1 },
                    { id: 3, name: 'วิทยาลัยเภสัชกรรมสมุนไพร', description: 'คอร์สเกี่ยวกับสมุนไพร', courseCount: 1 },
                    { id: 4, name: 'วิทยาลัยเภสัชกรรมอุตสาหการ', description: 'คอร์สเกี่ยวกับอุตสาหกรรมยา', courseCount: 0 },
                    { id: 5, name: 'วิทยาลัยเภสัชกรรมชุมชน', description: 'คอร์สเกี่ยวกับเภสัชกรรมชุมชน', courseCount: 2 },
                    { id: 6, name: 'วิทยาลัยการบริหารเภสัชกิจ', description: 'คอร์สเกี่ยวกับการบริหารเภสัชกิจ', courseCount: 0 },
                    { id: 7, name: 'วิทยาลัยเภสัชพันธุศาสตร์และเภสัชกรรมแม่นยำ', description: 'คอร์สเกี่ยวกับเภสัชพันธุศาสตร์', courseCount: 0 },
                    { id: 8, name: 'อื่นๆ', description: 'คอร์สทั่วไป', courseCount: 0 },
                ],
            };
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    },

    /**
     * Delete a course
     */
    async deleteCourse(id: number): Promise<void> {
        try {
            // In production: await apiClient.delete(`/courses/${id}`);
            console.log('Delete course:', id);
        } catch (error) {
            console.error('Failed to delete course:', error);
            throw error;
        }
    },

    /**
     * Create a new course
     */
    async createCourse(data: any): Promise<any> {
        try {
            // In production: const response = await apiClient.post('/courses', data);
            console.log('Create course payload:', data);

            // Mock response
            return {
                id: Date.now(),
                ...data,
                status: 'draft',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        } catch (error) {
            console.error('Failed to create course:', error);
            throw error;
        }
    },

    /**
     * Update an existing course
     */
    async updateCourse(id: number | string, data: any): Promise<any> {
        try {
            // In production: const response = await apiClient.put(`/courses/${id}`, data);
            console.log(`Update course ${id} payload:`, data);

            // Mock response
            return {
                id,
                ...data,
                updatedAt: new Date().toISOString(),
            };
        } catch (error) {
            console.error('Failed to update course:', error);
            throw error;
        }
    }
};
