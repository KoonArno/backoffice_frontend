import type { Tag } from '../types';
import { Plus, Tags as TagsIcon, Trash2 } from 'lucide-react';

interface TagCloudProps {
    tags: Tag[];
    onAdd?: () => void;
    onDelete?: (id: string) => void;
}

export function TagCloud({ tags, onAdd, onDelete }: TagCloudProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-violet-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center shadow-sm">
                        <TagsIcon size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">แท็ก</h2>
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 text-violet-600 hover:text-violet-700 bg-white px-4 py-2 rounded-xl font-semibold text-sm shadow-sm hover:shadow transition-all"
                >
                    <Plus size={18} />
                    <span>เพิ่มแท็ก</span>
                </button>
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2.5">
                    {tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-100 rounded-full text-sm group hover:bg-slate-200 cursor-pointer transition-all"
                        >
                            <span className="text-slate-700 font-medium">{tag.name}</span>
                            <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-full">
                                {tag.courseCount}
                            </span>
                            <button
                                onClick={() => onDelete?.(tag.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                title="ลบแท็ก"
                            >
                                <Trash2 size={14} className="text-red-500" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
