export const metadata = {
    title: 'Login - Admin Backoffice',
    description: 'Login to access the admin dashboard',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            {children}
        </div>
    );
}
