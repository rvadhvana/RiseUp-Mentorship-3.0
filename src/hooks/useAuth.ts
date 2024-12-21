import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { User } from '../types';

// Demo users with predefined credentials
const DEMO_USERS: Record<string, User> = {
  'admin@riseup.com': {
    id: 'admin-1',
    email: 'admin@riseup.com',
    name: 'Admin User',
    role: 'admin',
    status: 'approved'
  },
  'jay@riseup.com': {
    id: 'mentee-1',
    email: 'jay@riseup.com',
    name: 'Jay Smith',
    role: 'mentee',
    status: 'approved',
    profile: {
      education: [{
        institution: 'Tech University',
        degree: 'BS',
        field: 'Computer Science',
        startYear: 2020,
        current: true
      }],
      careerGoals: 'Become a Full Stack Developer',
      interests: ['Web Development', 'AI/ML', 'Cloud Computing'],
      jobSeekingStatus: {
        isLookingForJob: true,
        preferences: {
          positions: ['Frontend Developer', 'Full Stack Developer'],
          expectedSalary: {
            min: 80000,
            max: 120000,
            currency: 'USD'
          },
          preferredCompanies: ['Google', 'Microsoft', 'Meta'],
          preferredLocations: ['San Francisco, CA', 'Seattle, WA'],
          remotePreference: 'hybrid'
        },
        lastUpdated: new Date().toISOString()
      }
    }
  },
  'romik@riseup.com': {
    id: 'mentor-1',
    email: 'romik@riseup.com',
    name: 'Romik Patel',
    role: 'mentor',
    status: 'approved',
    profile: {
      education: [{
        institution: 'Stanford University',
        degree: 'MS',
        field: 'Computer Science',
        startYear: 2015,
        endYear: 2017,
        current: false
      }],
      careerGoals: 'Help others grow in their tech careers',
      interests: ['System Design', 'Cloud Architecture', 'Mentorship'],
      currentRole: 'Senior Software Architect',
      company: 'Tech Giants Inc'
    }
  }
};

export function useAuth() {
  const navigate = useNavigate();
  const { login, logout } = useAuthStore();
  
  const initAuth = useCallback(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      login(JSON.parse(savedUser));
      navigate('/dashboard');
    }
  }, [login, navigate]);

  const signInWithEmail = async (email: string, password: string) => {
    // For demo purposes, we'll use predefined users
    const demoUser = DEMO_USERS[email.toLowerCase()];
    
    if (demoUser) {
      login(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      navigate('/dashboard');
    } else {
      throw new Error('Invalid credentials. Please use one of the demo accounts.');
    }
  };

  const signUpWithEmail = async (email: string, password: string, userData: any) => {
    // For demo, we'll create a new user with pending status
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: userData.name,
      role: userData.role,
      status: 'pending'
    };
    
    login(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/dashboard');
  };

  const signOut = async () => {
    logout();
    localStorage.removeItem('user');
    navigate('/login');
  };

  return {
    initAuth,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
}