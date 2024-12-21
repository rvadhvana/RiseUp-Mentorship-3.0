import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { BookingModal } from '../components/BookingModal';
import { MentorCard } from '../components/mentors/MentorCard';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import type { Speaker, FilterCriteria } from '../types';

// Mock data for mentors
const MENTORS: Speaker[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Research Director',
    company: 'TechCorp AI',
    location: 'San Francisco, CA',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks'],
    bio: 'Leading AI researcher with 15+ years of experience in developing cutting-edge machine learning solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    certifications: [
      'Ph.D. in Computer Science, Stanford University',
      'Google AI Research Fellow',
      'IEEE Senior Member'
    ],
    availableSlots: [
      {
        id: '1',
        startTime: '2024-03-20T10:00:00Z',
        endTime: '2024-03-20T11:00:00Z',
        isBooked: false,
      },
      {
        id: '2',
        startTime: '2024-03-21T14:00:00Z',
        endTime: '2024-03-21T15:00:00Z',
        isBooked: false,
      },
    ],
  },
  {
    id: '2',
    name: 'James Wilson',
    title: 'Senior Software Architect',
    company: 'CloudScale Systems',
    location: 'New York, NY',
    expertise: ['Cloud Architecture', 'Microservices', 'DevOps', 'System Design'],
    bio: 'Cloud architecture expert specializing in scalable systems and microservices design.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    certifications: [
      'AWS Solutions Architect Professional',
      'Google Cloud Professional Architect',
      'CNCF Kubernetes Expert'
    ],
    availableSlots: [
      {
        id: '3',
        startTime: '2024-03-22T09:00:00Z',
        endTime: '2024-03-22T10:00:00Z',
        isBooked: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Product Design Lead',
    company: 'InnovateUX',
    location: 'Austin, TX',
    expertise: ['UX Design', 'Product Strategy', 'Design Systems', 'User Research'],
    bio: 'Passionate about creating user-centered designs that drive business growth and user satisfaction.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    certifications: [
      'Master of Design, RISD',
      'Google UX Design Professional Certificate',
      'Design Leadership Certificate, IDEO'
    ],
    availableSlots: [
      {
        id: '4',
        startTime: '2024-03-23T15:00:00Z',
        endTime: '2024-03-23T16:00:00Z',
        isBooked: false,
      },
    ],
  },
];

export function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterCriteria>({
    location: '',
    expertise: '',
    company: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Speaker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, user, addConnectionRequest } = useAuthStore();
  const navigate = useNavigate();

  const filteredMentors = MENTORS.filter((mentor) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchLower) ||
      mentor.expertise.some(skill => skill.toLowerCase().includes(searchLower));
    
    const matchesLocation = !filters.location || 
      mentor.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesExpertise = !filters.expertise ||
      mentor.expertise.some(skill => 
        skill.toLowerCase().includes(filters.expertise.toLowerCase())
      );
    
    const matchesCompany = !filters.company ||
      mentor.company.toLowerCase().includes(filters.company.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesExpertise && matchesCompany;
  });

  const handleBooking = (mentorId: string) => {
    const mentor = MENTORS.find((m) => m.id === mentorId);
    if (mentor) {
      setSelectedMentor(mentor);
      setIsModalOpen(true);
    }
  };

  const handleConnect = (mentorId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const connectionRequest = {
      id: Math.random().toString(36).substr(2, 9),
      menteeId: user.id,
      mentorId,
      status: 'pending',
      message: `I would like to connect with you for mentorship.`,
      createdAt: new Date().toISOString()
    };
    
    addConnectionRequest(connectionRequest);
    // In a real app, this would make an API call
    alert('Connection request sent successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Mentor</h1>
          <p className="mt-2 text-gray-600">Connect with industry experts who can guide your career journey</p>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full sm:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-md space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Filter by location"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expertise
                  </label>
                  <input
                    type="text"
                    placeholder="Filter by expertise"
                    value={filters.expertise}
                    onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Filter by company"
                    value={filters.company}
                    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
              isAuthenticated={isAuthenticated}
              onBooking={handleBooking}
              onConnect={handleConnect}
            />
          ))}
        </div>

        {selectedMentor && (
          <BookingModal
            mentor={selectedMentor}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedMentor(null);
            }}
            onSubmit={(data) => {
              console.log('Booking submitted:', { mentorId: selectedMentor.id, ...data });
              setIsModalOpen(false);
              setSelectedMentor(null);
            }}
          />
        )}
      </div>
    </div>
  );
}