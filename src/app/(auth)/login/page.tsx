'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/auth-context';
import { ShieldCheck, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null); // 'email' | 'password' | null
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      const loginErr = err as Error & { field?: string };
      setError(loginErr.message || 'เข้าสู่ระบบล้มเหลว');
      setFieldError(loginErr.field || null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25 mb-4">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Pharmacy Academy</h1>
          <p className="text-blue-300/70 text-sm">Backoffice Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">เข้าสู่ระบบ</h2>

          {/* General Error Message (when no specific field) */}
          {error && !fieldError && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200/80 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${fieldError === 'email' ? 'text-red-400' : 'text-blue-300/50'}`} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (fieldError === 'email') { setError(''); setFieldError(null); } }}
                  placeholder="admin@pharmacy.ac.th"
                  required
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${fieldError === 'email' ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-blue-500/50'}`}
                />
              </div>
              {fieldError === 'email' && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {error}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-200/80 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${fieldError === 'password' ? 'text-red-400' : 'text-blue-300/50'}`} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (fieldError === 'password') { setError(''); setFieldError(null); } }}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-blue-300/30 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${fieldError === 'password' ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:ring-blue-500/50'}`}
                />
              </div>
              {fieldError === 'password' && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-300/30 text-xs mt-6">
          © 2026 Pharmacy Academy — Admin Panel
        </p>
      </div>
    </div>
  );
}
