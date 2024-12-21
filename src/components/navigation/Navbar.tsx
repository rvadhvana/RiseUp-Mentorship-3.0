import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Users, Rocket, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ to, children, className = '' }: NavLinkProps) => (
  <Link
    to={to}
    className={`inline-flex items-center px-4 py-2 text-sm font-medium ${className}`}
  >
    {children}
  </Link>
);

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  const handleFindMentors = useCallback(() => {
    navigate('/mentors');
  }, [navigate]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-100 rounded-full blur"></div>
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2 shadow-lg">
                    <Rocket className="h-6 w-6 text-white transform rotate-45" />
                  </div>
                </div>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:inline">RiseUP Mentorship</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleFindMentors}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
            >
              <Users className="h-5 w-5 mr-2" />
              Find Mentors
            </button>
            
            {isAuthenticated && (
              <Link
              to="/mentors"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
              >
                <Users className="h-5 w-5 mr-2" />
                Browse Mentors
              </Link>
            )}
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </Link>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-lg border-t border-gray-100 z-50">
            <div className="p-4 space-y-3">
              <Link
                to="/mentors"
                className="flex items-center px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Users className="inline-block h-5 w-5 mr-2" />
                Find Mentors
              </Link>
              
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="inline-block h-5 w-5 mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  <LogIn className="inline-block h-5 w-5 mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}