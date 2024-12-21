import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { EventManager } from './EventManager';
import { RegistrationRequests } from './RegistrationRequests';
import type { Event, RegistrationRequest } from '../../types';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'events' | 'requests'>('events');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage events and registration requests</p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`${
                activeTab === 'events'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`${
                activeTab === 'requests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Users className="w-4 h-4 mr-2" />
              Registration Requests
            </button>
          </nav>
        </div>

        {activeTab === 'events' ? (
          <EventManager />
        ) : (
          <RegistrationRequests />
        )}
      </div>
    </div>
  );
}