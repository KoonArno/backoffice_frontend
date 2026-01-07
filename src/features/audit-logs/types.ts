// Audit Logs Feature Types

export interface AuditLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    target: string;
    targetType: 'user' | 'course' | 'payment' | 'setting' | 'other';
    ipAddress: string;
    userAgent?: string;
    details?: Record<string, unknown>;
    createdAt: string;
}

export type AuditAction =
    | 'create'
    | 'update'
    | 'delete'
    | 'login'
    | 'logout'
    | 'view'
    | 'export';

// Mock data for audit logs
export const MOCK_AUDIT_LOGS: AuditLog[] = [
    {
        id: '1',
        userId: 'admin1',
        userName: 'ผู้ดูแลระบบ',
        action: 'สร้างคอร์สใหม่',
        target: 'การดูแลผู้ป่วยโรคเรื้อรัง',
        targetType: 'course',
        ipAddress: '192.168.1.100',
        createdAt: '2024-12-22T10:30:00Z'
    },
    {
        id: '2',
        userId: 'admin1',
        userName: 'ผู้ดูแลระบบ',
        action: 'แก้ไขผู้ใช้',
        target: 'สมชาย ใจดี',
        targetType: 'user',
        ipAddress: '192.168.1.100',
        createdAt: '2024-12-22T09:45:00Z'
    },
    {
        id: '3',
        userId: 'admin1',
        userName: 'ผู้ดูแลระบบ',
        action: 'ลบคูปอง',
        target: 'NEWYEAR2024',
        targetType: 'payment',
        ipAddress: '192.168.1.100',
        createdAt: '2024-12-22T09:15:00Z'
    },
    {
        id: '4',
        userId: 'admin1',
        userName: 'ผู้ดูแลระบบ',
        action: 'เข้าสู่ระบบ',
        target: '-',
        targetType: 'other',
        ipAddress: '192.168.1.100',
        createdAt: '2024-12-22T08:00:00Z'
    },
];
