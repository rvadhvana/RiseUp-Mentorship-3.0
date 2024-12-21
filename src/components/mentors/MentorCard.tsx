import React from 'react';
import { Calendar, Clock, Briefcase, Tag, UserPlus, MapPin } from 'lucide-react';
import type { Speaker } from '../../types';
import { useNavigate } from 'react-router-dom';

interface MentorCardProps {
  mentor: Speaker;
  isAuthenticated: boolean;
  onBooking: (mentorId: string) => void;
  onConnect: (mentorId: string) => void;
}

export function MentorCard({ mentor, isAuthenticated, onBooking, onConnect }: MentorCardProps) {
  const navigate = useNavigate();

  const handleAction = (action: 'book' | 'connect') => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (action === 'book') {
      onBooking(mentor.id);
    } else {
      onConnect(mentor.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4">
        <div className="flex-shrink-0">
          <img
            src={mentor.imageUrl}
            alt={mentor.name}
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-100 shadow-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between text-center sm:text-left space-y-2 sm:space-y-0">
            <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
            <button
              onClick={() => handleAction('connect')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors duration-200"
            >
              <UserPlus className="w-3 h-3 mr-1" />
              Connect
            </button>
          </div>
          <div className="mt-3 flex flex-col items-center sm:items-start space-y-2 sm:space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{mentor.title} at {mentor.company}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{mentor.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-2 sm:p-4 border-t border-gray-100">
        <div>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 transition-colors duration-200 hover:bg-blue-100"
              >
                <Tag className="w-3 h-3 mr-1" />
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">{mentor.bio}</p>
        <div className="mt-4 flex flex-col-reverse sm:flex-row items-center gap-3 sm:justify-between">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{mentor.availableSlots.length} available slots</span>
          </div>
          <button
            onClick={() => handleAction('book')}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow w-full sm:w-auto justify-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
}