// Audit Logs Feature Hooks
import { useState, useCallback } from 'react';
import type { AuditLog } from './types';
import { MOCK_AUDIT_LOGS } from './types';

export function useAuditLogs() {
    const [logs, setLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            // TODO: Implement API call
            setLogs(MOCK_AUDIT_LOGS);
        } finally {
            setLoading(false);
        }
    }, []);

    const filteredLogs = logs.filter(log =>
        log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.target.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        logs: filteredLogs,
        loading,
        fetchLogs,
        searchQuery,
        setSearchQuery
    };
}
