import type { Category, Course } from '../types';
export type { Category, Tag } from '../types';

export interface Subcategory {
    id: number;
    name: string;
    description?: string;
}

export interface CategoryWithCourses extends Category {
    courses: Course[];
}
