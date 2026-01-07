import { Search, Filter } from 'lucide-react';

interface UserTableToolbarProps {
    searchPlaceholder: string;
}

export function UserTableToolbar({ searchPlaceholder }: UserTableToolbarProps) {
    return (
        <div className="p-6 border-b border-sky-100 flex flex-wrap items-center gap-4 bg-gradient-to-r from-sky-50 to-blue-50">
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 flex-1 max-w-md border border-sky-200 shadow-sm">
                <Search size={20} className="text-sky-500" />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="bg-transparent border-none outline-none text-sm flex-1 text-slate-700 placeholder:text-slate-400"
                />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 border border-sky-200 bg-white rounded-xl hover:bg-sky-50 transition-all shadow-sm">
                <Filter size={18} className="text-sky-600" />
                <span className="text-sm font-semibold text-slate-700">ตัวกรอง</span>
            </button>
        </div>
    );
}
