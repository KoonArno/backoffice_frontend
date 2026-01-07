'use client';

import { useState, useEffect } from 'react';
import { courseService } from './services/courseService';
import type { CoursesData, CategoriesData } from './types';

export function useCourses() {
    const [data, setData] = useState<CoursesData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                setIsLoading(true);
                setError(null);
                const coursesData = await courseService.getCourses();
                setData(coursesData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load courses'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourses();
    }, []);

    return {
        courses: data?.courses || [],
        stats: data?.stats,
        isLoading,
        error,
        refresh: () => {
            setIsLoading(true);
            courseService.getCourses().then(setData).finally(() => setIsLoading(false));
        },
    };
}

export function useCategories() {
    const [data, setData] = useState<CategoriesData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true);
                setError(null);
                const categoriesData = await courseService.getCategories();
                setData(categoriesData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load categories'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return {
        categories: data?.categories || [],
        tags: data?.tags || [],
        isLoading,
        error,
        refresh: () => {
            setIsLoading(true);
            courseService.getCategories().then(setData).finally(() => setIsLoading(false));
        },
    };
}
