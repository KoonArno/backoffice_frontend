// Shared UI Components - SearchInput
import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = 'ค้นหา...',
    className = '',
}: SearchInputProps) {
    return (
        <div className={`flex items-center gap-2 bg-slate-100 rounded-lg px-4 py-2 ${className}`}>
            <Search size={18} className="text-slate-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent border-none outline-none text-sm flex-1"
            />
        </div>
    );
}
