import { create } from 'zustand';
import type { User, ConnectionRequest, RegistrationRequest } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  connectionRequests: ConnectionRequest[];
  pendingRegistrations: (RegistrationRequest & {
    userData: {
      name: string;
      email: string;
      expertise?: string[];
    };
  })[];
  login: (user: User) => void;
  logout: () => void;
  addConnectionRequest: (request: ConnectionRequest) => void;
  updateConnectionStatus: (requestId: string, status: 'accepted' | 'rejected') => void;
  updateUserStatus: (userId: string, status: 'approved' | 'rejected') => void;
  addPendingRegistration: (request: RegistrationRequest) => void;
  updateRegistrationStatus: (requestId: string, status: 'approved' | 'rejected') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  connectionRequests: [],
  pendingRegistrations: [],
  login: (user) => {
    set({ user, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  },
  addConnectionRequest: (request) =>
    set((state) => ({
      connectionRequests: [...state.connectionRequests, request]
    })),
  updateConnectionStatus: (requestId, status) =>
    set((state) => ({
      connectionRequests: state.connectionRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    })),
  updateUserStatus: (userId, status) => 
    set((state) => ({
      user: state.user?.id === userId ? { ...state.user, status } : state.user
    })),
  addPendingRegistration: (request) =>
    set((state) => ({
      pendingRegistrations: [...state.pendingRegistrations, request]
    })),
  updateRegistrationStatus: (requestId, status) =>
    set((state) => ({
      pendingRegistrations: state.pendingRegistrations.map(req =>
        req.id === requestId ? { ...req, status, reviewedAt: new Date().toISOString() } : req
      ),
      user: state.user && state.pendingRegistrations.find(req => req.id === requestId)?.userId === state.user.id
        ? { ...state.user, status }
        : state.user
    })),
}));