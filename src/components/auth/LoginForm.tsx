import React, { useState, useCallback } from 'react';
import { LogIn, Mail, Lock, UserPlus, Key, Briefcase, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const EXPERTISE_OPTIONS = [
  // Technology & Engineering
  'IT Engineering & Development',
  'Information Technology & Cybersecurity',
  'Data Science & Analytics',
  'Civil Engineering',
  'Mechanical Engineering',
  
  // Business & Finance
  'Business & Management',
  'Finance & Accounting',
  'Sales & Marketing',
  
  // Creative & Design
  'Art & Design',
  'Media & Communications',
  
  // Healthcare & Science
  'Healthcare',
  'Science & Research',
  
  // Other Industries
  'Education & Academia',
  'Government & Public Administration',
  'Law & Legal Services',
  'Hospitality & Tourism',
  'Real Estate & Property Management',
  'Energy & Utilities',
  'Environmental & Sustainability',
  'Agricultural & Natural Resources',
  'Entrepreneurship & Startup',
  'Skill Trades & Technical Work'
];

type FormMode = 'login' | 'register' | 'forgot';

export function LoginForm() {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'mentor' | 'mentee'>('mentee');
  const [expertise, setExpertise] = useState<string[]>([]);
  const [mode, setMode] = useState<FormMode>('login');

  const handleExpertiseChange = (value: string) => {
    setExpertise(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else if (mode === 'register') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const userData = {
          name,
          role,
          status: 'pending',
          expertise: role === 'mentor' ? expertise : [],
        };

        await signUpWithEmail(email, password, userData);
      } else if (mode === 'forgot') {
        // TODO: Implement password reset
        alert('Password reset functionality will be implemented soon.');
        setMode('login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [mode, email, password, name, confirmPassword, role, expertise, signInWithEmail, signUpWithEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <div>
          <div className="flex justify-center">
            <UserPlus className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Sign in to your account' :
             mode === 'register' ? 'Create your account' :
             'Reset your password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'login' ? "Don't have an account? " :
             mode === 'register' ? 'Already have an account? ' :
             'Remember your password? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {mode === 'login' ? 'Register now' :
               mode === 'register' ? 'Sign in' :
               'Sign in'}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <UserPlus className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 ${mode === 'register' ? '' : 'rounded-t-md'} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
            </div>
            {mode !== 'forgot' && <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 ${mode === 'register' ? '' : 'rounded-b-md'} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                />
              </div>
            </div>}
            
            {mode === 'register' && (
              <>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {mode !== 'forgot' && <div className="flex items-center justify-center space-x-4">
            {mode === 'login' && (
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Admin
                </span>
              </label>
            )}
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={role === 'mentee'}
                onChange={() => setRole('mentee')}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Mentee</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={role === 'mentor'}
                onChange={() => setRole('mentor')}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Mentor</span>
            </label>
          </div>
          }
          
          {mode === 'register' && role === 'mentor' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Your Industry & Expertise
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {EXPERTISE_OPTIONS.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={expertise.includes(option)}
                      onChange={() => handleExpertiseChange(option)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {mode === 'login' ? (
                  <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                ) : mode === 'register' ? (
                  <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                ) : (
                  <Key className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                )}
              </span>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' :
               mode === 'register' ? 'Create account' :
               'Reset password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}