import { apiClient } from '@/services/api/client';
import type { User, Pharmacist, UserStats, PharmacistStats, UsersData, PharmacistsData } from '../types';

export const userService = {
    /**
     * Fetch all general users
     */
    async getUsers(): Promise<UsersData> {
        try {
            // In production: const response = await apiClient.get<UsersData>('/users');
            // return response.data;

            // Mock data for now
            const users: User[] = [
                { id: '1', name: 'สมชาย ใจดี', email: 'somchai@email.com', status: 'active', joined: new Date('2024-01-15'), courses: 3 },
                { id: '2', name: 'สมหญิง รักเรียน', email: 'somying@email.com', status: 'active', joined: new Date('2024-01-20'), courses: 5 },
                { id: '3', name: 'วิภา มานะ', email: 'vipa@email.com', status: 'inactive', joined: new Date('2024-01-25'), courses: 1 },
                { id: '4', name: 'ณัฐพล เก่งมาก', email: 'nattapol@email.com', status: 'active', joined: new Date('2024-01-28'), courses: 8 },
                { id: '5', name: 'ปิยะ รักดี', email: 'piya@email.com', status: 'active', joined: new Date('2024-02-01'), courses: 2 },
            ];

            const stats: UserStats = {
                total: 5234,
                active: 4892,
                inactive: 342,
            };

            return { users, stats };
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    },

    /**
     * Fetch all pharmacists
     */
    async getPharmacists(): Promise<PharmacistsData> {
        try {
            // In production: const response = await apiClient.get<PharmacistsData>('/users/pharmacists');
            // return response.data;

            // Mock data for now
            const pharmacists: Pharmacist[] = [
                { id: '1', name: 'ภก.สุรชัย เก่งมาก', email: 'surachai@email.com', license: 'ภ.12345', status: 'active', verificationStatus: 'verified', cpeCredits: 25, courses: 6, joined: new Date('2024-01-10') },
                { id: '2', name: 'ภญ.วิภา รักการสอน', email: 'vipa@email.com', license: 'ภ.23456', status: 'active', verificationStatus: 'verified', cpeCredits: 18, courses: 4, joined: new Date('2024-01-15') },
                { id: '3', name: 'ภก.ณัฐพล มีความรู้', email: 'nattapol@email.com', license: 'ภ.34567', status: 'active', verificationStatus: 'verified', cpeCredits: 32, courses: 8, joined: new Date('2024-01-20') },
                { id: '4', name: 'ภญ.ปิยะ ใจดี', email: 'piya@email.com', license: 'ภ.45678', status: 'active', verificationStatus: 'verified', cpeCredits: 12, courses: 3, joined: new Date('2024-01-25') },
                { id: '5', name: 'ภก.สมชาย รักเรียน', email: 'somchai@email.com', license: 'ภ.56789', status: 'active', verificationStatus: 'verified', cpeCredits: 45, courses: 10, joined: new Date('2024-02-01') },
            ];

            const stats: PharmacistStats = {
                total: 7611,
                active: 7456,
                inactive: 155,
                verified: 7456,
                totalCpeCredits: 186400,
                averageCpeCredits: 25,
            };

            return { pharmacists, stats };
        } catch (error) {
            console.error('Failed to fetch pharmacists:', error);
            throw error;
        }
    },

    /**
     * Delete a user
     */
    async deleteUser(id: string): Promise<void> {
        try {
            // In production: await apiClient.delete(`/users/${id}`);
            console.log('Delete user:', id);
        } catch (error) {
            console.error('Failed to delete user:', error);
            throw error;
        }
    },

    /**
     * Send email to user
     */
    async sendEmail(id: string, message: string): Promise<void> {
        try {
            // In production: await apiClient.post(`/users/${id}/email`, { message });
            console.log('Send email to:', id, message);
        } catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    },
};
