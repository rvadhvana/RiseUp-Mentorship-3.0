import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, Users, BookOpen, Star, Rocket, ArrowRight, Calendar } from 'lucide-react';
import { EventRegistration } from '../components/events/EventRegistration';
import { useAuthStore } from '../store/authStore';
import type { Event } from '../types';

const MOCK_EVENT: Event = {
  id: '1',
  title: 'RiseUP Tech Conference 2024',
  description: 'Join us for an inspiring day of learning and networking with industry leaders.',
  date: '2024-04-15',
  lumaUrl: 'https://lu.ma/riseup-tech-2024',
  registrationDeadline: '2024-04-01',
  isActive: true
};

const BENEFITS = [
  {
    icon: <Target className="h-8 w-8 text-white" />,
    title: 'Career Guidance',
    description: 'Get personalized guidance from industry experts to navigate your career path effectively.'
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: 'Network Building',
    description: 'Connect with professionals and peers to build a strong professional network.'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-white" />,
    title: 'Skill Development',
    description: 'Access curated resources and track your progress with structured learning paths.'
  },
  {
    icon: <Star className="h-8 w-8 text-white" />,
    title: 'Real-world Experience',
    description: 'Learn from practitioners who share their real-world experiences and insights.'
  }
];

export function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        {MOCK_EVENT.isActive && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <EventRegistration event={MOCK_EVENT} />
            </div>
          </div>
        )}

        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Elevate Your Career with</span>
              <span className="block text-blue-600">RiseUP Mentorship</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:max-w-2xl">
              Connect with industry leaders, accelerate your growth, and unlock your potential through personalized mentorship.
            </p>
            <div className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/mentors"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-105 w-full sm:w-auto"
              >
                Find Your Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login?role=mentor"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-base font-medium rounded-md shadow-lg text-blue-600 hover:bg-blue-50 transform transition-all duration-200 hover:scale-105 w-full sm:w-auto"
              >
                Join as Mentor
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          </div>
        </div>

        <div className="py-4 md:py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="my-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Share Your Expertise</h2>
              <p className="text-lg mb-6 text-blue-100">
                Join our community of mentors and help shape the next generation of leaders.
              </p>
              <div className="flex justify-center px-4">
                <Link
                  to="/login?role=mentor"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transform transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                >
                  Become a Mentor
                  <Users className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Why Choose RiseUP Mentorship?
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-16">
              Empowering the next generation of leaders through expert guidance and support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
             {BENEFITS.map((benefit, index) => (
               <div key={index} className="relative bg-white rounded-lg px-6 pt-12 pb-8 hover:shadow-lg transition-shadow duration-200">
                 <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                   <div className="relative">
                     <div className="absolute -inset-2 bg-blue-100 rounded-full blur-sm"></div>
                     <div className="relative inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
                       {benefit.icon}
                     </div>
                   </div>
                </div>
                 <div className="text-center">
                   <h3 className="text-lg font-medium text-gray-900 tracking-tight mb-3">
                     {benefit.title}
                   </h3>
                   <p className="text-sm text-gray-500 leading-relaxed">
                     {benefit.description}
                   </p>
                 </div>
               </div>
             ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}