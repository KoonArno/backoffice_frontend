// Category types
export interface Subcategory {
    id: string;
    name: string;
    description?: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
    subcategories: Subcategory[];
    courseCount: number;
}

export interface CategoryWithCourses extends Category {
    courses: any[]; // Will use Course type from courses
}
