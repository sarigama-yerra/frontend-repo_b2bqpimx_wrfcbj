import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '@types/inventory';

interface AuthContextState {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

const LS_KEY = 'ims.auth.user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) setUser(JSON.parse(cached));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user));
    else localStorage.removeItem(LS_KEY);
  }, [user]);

  const login = async (username: string, password: string) => {
    // Simple demo auth: any non-empty credentials
    if (username && password) {
      const demoUser: User = {
        id: 'u-1',
        name: 'مدير النظام',
        role: 'admin',
        username,
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
