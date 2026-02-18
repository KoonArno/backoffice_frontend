'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Types
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'officer';
}

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isOfficer: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const TOKEN_KEY = 'backoffice_token';
const USER_KEY = 'backoffice_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userStr = localStorage.getItem(USER_KEY);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as AdminUser;
        setState({ user, token, isAuthenticated: true, isLoading: false });

        // Verify token is still valid
        fetch(`${API_BASE}/v1/admin/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error('Token expired');
            return res.json();
          })
          .then((data) => {
            if (data.success && data.user) {
              const verifiedUser: AdminUser = {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                role: data.user.role,
              };
              localStorage.setItem(USER_KEY, JSON.stringify(verifiedUser));
              setState({ user: verifiedUser, token, isAuthenticated: true, isLoading: false });
            }
          })
          .catch(() => {
            // Token is invalid, clear everything
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
          });
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/v1/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const err = new Error(data.error || data.message || 'เข้าสู่ระบบล้มเหลว');
      (err as Error & { field?: string }).field = data.field || null;
      throw err;
    }

    const user: AdminUser = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      role: data.user.role,
    };

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    setState({ user, token: data.token, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    router.push('/login');
  }, [router]);

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    isAdmin: state.user?.role === 'admin',
    isOfficer: state.user?.role === 'officer',
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
