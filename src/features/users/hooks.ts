'use client';

import { useState, useEffect } from 'react';
import { userService } from './services/userService';
import type { UsersData, PharmacistsData } from './types';

export function useUsers() {
    const [data, setData] = useState<UsersData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                setIsLoading(true);
                setError(null);
                const usersData = await userService.getUsers();
                setData(usersData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load users'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return {
        users: data?.users || [],
        stats: data?.stats,
        isLoading,
        error,
        refresh: () => {
            setIsLoading(true);
            userService.getUsers().then(setData).finally(() => setIsLoading(false));
        },
    };
}

export function usePharmacists() {
    const [data, setData] = useState<PharmacistsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchPharmacists() {
            try {
                setIsLoading(true);
                setError(null);
                const pharmacistsData = await userService.getPharmacists();
                setData(pharmacistsData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load pharmacists'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchPharmacists();
    }, []);

    return {
        pharmacists: data?.pharmacists || [],
        stats: data?.stats,
        isLoading,
        error,
        refresh: () => {
            setIsLoading(true);
            userService.getPharmacists().then(setData).finally(() => setIsLoading(false));
        },
    };
}
