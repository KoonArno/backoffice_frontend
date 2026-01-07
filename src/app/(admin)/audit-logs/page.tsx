import { Search, Filter, Clock, User, FileText } from 'lucide-react';

const logs = [
    { id: 1, user: 'ผู้ดูแลระบบ', action: 'สร้างคอร์สใหม่', target: 'การดูแลผู้ป่วยโรคเรื้อรัง', ip: '192.168.1.100', time: '22 ธ.ค. 2024 10:30' },
    { id: 2, user: 'ผู้ดูแลระบบ', action: 'แก้ไขผู้ใช้', target: 'สมชาย ใจดี', ip: '192.168.1.100', time: '22 ธ.ค. 2024 09:45' },
    { id: 3, user: 'ผู้ดูแลระบบ', action: 'ลบคูปอง', target: 'NEWYEAR2024', ip: '192.168.1.100', time: '22 ธ.ค. 2024 09:15' },
    { id: 4, user: 'ผู้ดูแลระบบ', action: 'เข้าสู่ระบบ', target: '-', ip: '192.168.1.100', time: '22 ธ.ค. 2024 08:00' },
];

export default function AuditLogsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">ประวัติการใช้งาน</h1>
                <p className="text-slate-500">ติดตามการดำเนินการในระบบ</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-4 border-b border-slate-200 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-4 py-2 flex-1 max-w-md">
                        <Search size={18} className="text-slate-400" />
                        <input type="text" placeholder="ค้นหา..." className="bg-transparent border-none outline-none text-sm flex-1" />
                    </div>
                    <input type="date" className="px-4 py-2 border border-slate-200 rounded-lg text-sm" />
                </div>

                <div className="divide-y divide-slate-100">
                    {logs.map((log) => (
                        <div key={log.id} className="p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                <User size={20} className="text-slate-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">
                                    <span className="font-medium text-slate-800">{log.user}</span>
                                    <span className="text-slate-500"> {log.action} </span>
                                    <span className="font-medium text-blue-600">{log.target}</span>
                                </p>
                                <p className="text-xs text-slate-400 mt-1">IP: {log.ip}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Clock size={14} />
                                <span>{log.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
