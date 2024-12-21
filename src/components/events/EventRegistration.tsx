import React from 'react';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import type { Event } from '../../types';

interface EventRegistrationProps {
  event: Event;
}

export function EventRegistration({ event }: EventRegistrationProps) {
  const handleRegister = () => {
    window.open(event.lumaUrl, '_blank');
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <Calendar className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white">{event.title}</h2>
          <div className="mt-0.5 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-white/80">
            <div className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center mt-0.5 sm:mt-0">
              <Clock className="mr-1.5 h-4 w-4" />
              Registration closes: {new Date(event.registrationDeadline).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleRegister}
          className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
        >
          Register Now
          <ExternalLink className="ml-2 -mr-0.5 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}