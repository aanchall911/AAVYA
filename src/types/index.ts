export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface TimelinePoint {
  date: string;
  score: number;
  level: RiskLevel;
  note?: string;
  triggerEvent?: string;
}

export interface InteractionRecord {
  id: string;
  channel: 'Chatbot' | 'IVRS' | 'SMS' | 'Mobile App' | 'In-Person';
  timestamp: string;
  summary: string;
  sentiment: 'Positive' | 'Neutral' | 'Distressed' | 'Critical';
  distressScore: number;
  language: string;
  flaggedKeywords: string[];
}

export interface Intervention {
  id: string;
  title: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  category: 'Counselling' | 'Protection' | 'Legal' | 'Financial' | 'Follow-up';
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo?: string;
  dueDate?: string;
}

export interface CaseDocument {
  id: string;
  title: string;
  type: 'FIR' | 'Medical' | 'Legal' | 'Counselling' | 'Court' | 'Protection';
  date: string;
  size: string;
  status: 'Verified' | 'Pending Review';
}

export interface VictimCase {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  district: string;
  state: string;
  registeredDate: string;
  status: 'Investigation' | 'Trial' | 'Post-Trial' | 'Protection Active';
  currentDistressScore: number;
  riskLevel: RiskLevel;
  phone: string;
  preferredLanguage: string;
  assignedOfficer: string;
  assignedCounsellor?: string;
  nhaaReferenceId: string;
  escalationTrend: 'Increasing' | 'Stable' | 'Decreasing';
  distressTimeline: TimelinePoint[];
  topRiskFactors: { factor: string; percentage: number }[];
  aiAnalysis: {
    primaryEmotions: string[];
    threatConfidence: number;
    acousticBiomarkers: string[];
    sentimentTrend: string;
    summary: string;
    keyFlags: string[];
  };
  recommendedInterventions: Intervention[];
  interactions: InteractionRecord[];
  documents: CaseDocument[];
  notes: { date: string; author: string; role: string; content: string }[];
}

export interface AlertItem {
  id: string;
  caseId: string;
  victimName: string;
  score: number;
  riskTag: 'Just: HIGH' | 'Risk: HIGH' | 'Critical SOS';
  timestamp: string;
  district: string;
  triggerReason: string;
  unread: boolean;
}

export interface Counsellor {
  id: string;
  name: string;
  specialty: string;
  district: string;
  languages: string[];
  activeCases: number;
  rating: number;
  availability: 'Available' | 'In Session' | 'On Leave';
  avatar: string;
}
