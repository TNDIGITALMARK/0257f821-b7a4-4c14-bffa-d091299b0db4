'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { mockUser } from '@/lib/mock-data';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  points: number;
  rank: number;
  winRate: number;
  totalBets: number;
  activeBets: number;
  notifications: number;
  joinedCommunities: string[];
  badges: Array<{
    id: string;
    label: string;
    color: 'gold' | 'silver' | 'bronze' | 'blue' | 'green' | 'red';
  }>;
  stats: {
    thisWeek: {
      betsPlaced: number;
      betsWon: number;
      pointsEarned: number;
      winRate: number;
    };
    thisMonth: {
      betsPlaced: number;
      betsWon: number;
      pointsEarned: number;
      winRate: number;
    };
    allTime: {
      betsPlaced: number;
      betsWon: number;
      pointsEarned: number;
      winRate: number;
      longestStreak: number;
      currentStreak: number;
    };
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth session
    const checkAuth = async () => {
      setLoading(true);

      // Check localStorage for mock session
      const storedUser = localStorage.getItem('sportsbet_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('sportsbet_user');
        }
      } else {
        // Auto-login with mock user for demo
        setUser(mockUser);
        localStorage.setItem('sportsbet_user', JSON.stringify(mockUser));
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would make an API call
      if (email && password) {
        const userData = { ...mockUser, email };
        setUser(userData);
        localStorage.setItem('sportsbet_user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user creation
      if (name && email && password) {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          avatar: undefined,
          level: 1,
          points: 1000, // Starting points
          rank: 999999, // New user rank
          winRate: 0,
          totalBets: 0,
          activeBets: 0,
          notifications: 0,
          joinedCommunities: [],
          badges: [
            { id: 'newbie', label: 'New Player', color: 'bronze' }
          ],
          stats: {
            thisWeek: {
              betsPlaced: 0,
              betsWon: 0,
              pointsEarned: 0,
              winRate: 0
            },
            thisMonth: {
              betsPlaced: 0,
              betsWon: 0,
              pointsEarned: 0,
              winRate: 0
            },
            allTime: {
              betsPlaced: 0,
              betsWon: 0,
              pointsEarned: 1000,
              winRate: 0,
              longestStreak: 0,
              currentStreak: 0
            }
          }
        };

        setUser(newUser);
        localStorage.setItem('sportsbet_user', JSON.stringify(newUser));
      } else {
        throw new Error('All fields are required');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setUser(null);
      localStorage.removeItem('sportsbet_user');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('sportsbet_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}