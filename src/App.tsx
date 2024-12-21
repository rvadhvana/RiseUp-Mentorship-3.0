import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { HomePage } from './pages/HomePage';
import { Navbar } from './components/navigation/Navbar';
import { MentorsPage } from './pages/MentorsPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginForm } from './components/auth/LoginForm';
import { DashboardRouter } from './components/dashboard/DashboardRouter';
import { useAuth } from './hooks/useAuth';

function App() {
  const { initAuth } = useAuth();
  const { isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/mentors" 
          element={
            <div className="min-h-screen bg-gray-50">
              <MentorsPage />
            </div>
          } 
        />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} />
        <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <AdminDashboard /> : <LoginForm />} />
        <Route
          path="/dashboard"
          element={<DashboardRouter isAuthenticated={isAuthenticated} user={user} />}
        />
      </Routes>
    </>
  );
}

export default App;