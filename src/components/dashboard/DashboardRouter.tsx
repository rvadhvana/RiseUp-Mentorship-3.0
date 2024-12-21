import React from 'react';
import { AdminDashboard } from '../admin/AdminDashboard';
import { MentorDashboard } from './MentorDashboard';
import { MenteeDashboard } from './MenteeDashboard';
import { LoginForm } from '../auth/LoginForm';
import { Navigate } from 'react-router-dom';
import type { User } from '../../types';

interface DashboardRouterProps {
  isAuthenticated: boolean;
  user: User | null;
}

export function DashboardRouter({ isAuthenticated, user }: DashboardRouterProps) {
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  if (user.status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Pending</h2>
          <p className="text-gray-600">
            Your registration is pending approval. You'll be notified once an admin reviews your request.
          </p>
        </div>
      </div>
    );
  }

  if (user.status !== 'approved') {
    return <Navigate to="/login" />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'mentor':
      return <MentorDashboard />;
    case 'mentee':
      return <MenteeDashboard />;
    default:
      return <Navigate to="/login" />;
  }
}