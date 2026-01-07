import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-sky-50/50">
            <Sidebar />
            <Topbar />
            <main className="ml-[280px] pt-[72px] p-8">
                {children}
            </main>
        </div>
    );
}
