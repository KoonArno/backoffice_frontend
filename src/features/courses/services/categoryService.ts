import { apiClient } from '@/services/api/client';
import type { Category, Tag } from '../types';

export const categoryService = {
    async getCategories(): Promise<Category[]> {
        const response = await apiClient.get<{ data: Category[] }>('/categories');
        return response.data.data;
    },

    async getCategoryById(id: number | string): Promise<Category | null> {
        try {
            const response = await apiClient.get<{ data: Category }>(`/categories/${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Failed to get category:', error);
            return null;
        }
    },

    async createCategory(data: Partial<Category>): Promise<Category> {
        const response = await apiClient.post<{ data: Category }>('/categories', data);
        return response.data.data;
    },

    async updateCategory(id: number | string, data: Partial<Category>): Promise<Category> {
        const response = await apiClient.put<{ data: Category }>(`/categories/${id}`, data);
        return response.data.data;
    },

    async deleteCategory(id: number | string): Promise<void> {
        await apiClient.delete(`/categories/${id}`);
    },

    // Tags
    async getTags(): Promise<Tag[]> {
        const response = await apiClient.get<{ data: Tag[] }>('/tags');
        return response.data.data;
    },

    async createTag(name: string): Promise<Tag> {
        const response = await apiClient.post<{ data: Tag }>('/tags', { name });
        return response.data.data;
    },

    async deleteTag(id: number | string): Promise<void> {
        await apiClient.delete(`/tags/${id}`);
    },
};
