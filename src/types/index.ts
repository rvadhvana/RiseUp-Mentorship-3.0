export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  imageUrl: string;
  location: string;
  certifications: string[];
  availableSlots: TimeSlot[];
}

export type FilterCriteria = {
  location: string;
  expertise: string;
  company: string;
};

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Booking {
  id: string;
  speakerId: string;
  userId: string;
  timeSlot: TimeSlot;
  questions: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'mentor' | 'mentee';
  profile?: UserProfile;
  calendarConnected?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface UserProfile {
  education: Education[];
  careerGoals: string;
  interests: string[];
  jobSeekingStatus: JobSeekingStatus;
  currentRole?: string;
  company?: string;
  progress?: ProgressUpdate[];
}

export interface JobSeekingStatus {
  isLookingForJob: boolean;
  preferences?: {
    positions: string[];
    expectedSalary?: {
      min: number;
      max: number;
      currency: string;
    };
    preferredCompanies?: string[];
    preferredLocations?: string[];
    remotePreference: 'remote' | 'hybrid' | 'onsite' | 'flexible';
  };
  lastUpdated: string;
}
export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  current: boolean;
}

export interface ProgressUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  mentorFeedback?: string;
  status: 'pending' | 'in_progress' | 'completed';
  deadline?: string;
}

export interface MentorshipRequest {
  id: string;
  menteeId: string;
  mentorId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
}

export interface SkillProgress {
  id: string;
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  lastUpdated: string;
}

export interface ConnectionRequest {
  id: string;
  menteeId: string;
  mentorId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  lumaUrl: string;
  registrationDeadline: string;
  isActive: boolean;
}

export interface RegistrationRequest {
  id: string;
  userId: string;
  userRole: 'mentor' | 'mentee';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
}