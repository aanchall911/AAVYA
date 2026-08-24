import React, { createContext, useContext, useState, useEffect } from 'react';
import { VictimCase, AlertItem, Counsellor, Intervention } from '../types';
import { INITIAL_CASES, INITIAL_ALERTS, COUNSELLORS_LIST, SYSTEM_METRICS } from '../data/mockData';

interface AppContextType {
  // Cases & Selection
  cases: VictimCase[];
  selectedCase: VictimCase;
  setSelectedCaseById: (id: string) => void;
  updateCaseScore: (caseId: string, delta: number, note: string) => void;
  addInterventionToCase: (caseId: string, intervention: Intervention) => void;

  // Alerts
  alerts: AlertItem[];
  markAlertRead: (id: string) => void;
  triggerSosAlert: (caseId: string, reason: string) => void;
  unreadAlertsCount: number;

  // Counsellors
  counsellors: Counsellor[];

  // App Navigation & Roles
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  currentRole: string;
  setCurrentRole: (role: string) => void;
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;

  // Modals
  isAssignModalOpen: boolean;
  setIsAssignModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isSosModalOpen: boolean;
  setIsSosModalOpen: (open: boolean) => void;
  isSelfAssessmentOpen: boolean;
  setIsSelfAssessmentOpen: (open: boolean) => void;

  // Layout View mode (All / Dashboard Only / Victim Channels Only)
  viewMode: 'full' | 'dashboard' | 'victim';
  setViewMode: (mode: 'full' | 'dashboard' | 'victim') => void;

  // Live Chatbot & IVRS state
  chatMessages: Array<{ sender: 'bot' | 'user'; text: string; time: string; options?: string[] }>;
  sendChatMessage: (text: string) => void;
  resetChat: () => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<VictimCase[]>(INITIAL_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('NHAA-24-56876');
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [counsellors] = useState<Counsellor[]>(COUNSELLORS_LIST);
  const [activeNavTab, setActiveNavTab] = useState<string>('Dashboard');
  const [currentRole, setCurrentRole] = useState<string>('District Nodal Officer');
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [viewMode, setViewMode] = useState<'full' | 'dashboard' | 'victim'>('full');

  // Modals
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isSelfAssessmentOpen, setIsSelfAssessmentOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const setSelectedCaseById = (id: string) => {
    setSelectedCaseId(id);
  };

  const unreadAlertsCount = alerts.filter((a) => a.unread).length;

  const markAlertRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, unread: false } : a)));
  };

  const triggerSosAlert = (caseId: string, reason: string) => {
    const targetCase = cases.find((c) => c.id === caseId);
    const newAlert: AlertItem = {
      id: `alt-${Date.now()}`,
      caseId: caseId,
      victimName: targetCase ? targetCase.name : 'Unknown Victim',
      score: 98,
      riskTag: 'Critical SOS',
      timestamp: 'Just now (Critical SOS)',
      district: targetCase ? targetCase.district : 'Kaushambi, UP',
      triggerReason: reason,
      unread: true
    };
    setAlerts((prev) => [newAlert, ...prev]);
    showToast(`🚨 CRITICAL SOS DISPATCHED for ${targetCase?.name || caseId}! Police & Counsellor Alerted.`);
  };

  const updateCaseScore = (caseId: string, delta: number, note: string) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== caseId) return c;
        const newScore = Math.min(100, Math.max(0, c.currentDistressScore + delta));
        const newLevel = newScore >= 70 ? 'High' : newScore >= 40 ? 'Moderate' : 'Low';
        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2, '0')} May 2024`;
        
        const newTimeline = [...c.distressTimeline, {
          date: dateStr,
          score: newScore,
          level: newLevel,
          note: note,
          triggerEvent: 'Live interaction update'
        }];

        return {
          ...c,
          currentDistressScore: newScore,
          riskLevel: newLevel,
          distressTimeline: newTimeline
        };
      })
    );
  };

  const addInterventionToCase = (caseId: string, intervention: Intervention) => {
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id !== caseId) return c;
        return {
          ...c,
          recommendedInterventions: [intervention, ...c.recommendedInterventions]
        };
      })
    );
    showToast(`✓ Assigned: ${intervention.title} to ${intervention.assignedTo || 'Specialist'}`);
  };

  // Initial Chat Messages matching screenshot
  const initialBotMessages = [
    { sender: 'bot' as const, text: 'नमस्ते, मैं आपकी मदद के लिए यहाँ हूँ। आप कैसा महसूस कर रहे हैं आज?', time: '11:30 AM' },
    { sender: 'user' as const, text: 'मन बहुत परेशान है...', time: '11:31 AM' },
    { sender: 'bot' as const, text: 'क्या आप सुरक्षित महसूस कर रहे हैं? कृपया अपनी स्थिति बताएं।', time: '11:31 AM', options: ['हाँ', 'नहीं', 'थोड़ा', 'बात नहीं करना चाहता/चाहती'] }
  ];

  const [chatMessages, setChatMessages] = useState(initialBotMessages);

  const resetChat = () => {
    setChatMessages(initialBotMessages);
  };

  const sendChatMessage = (text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'user' as const, text, time };
    
    setChatMessages((prev) => [...prev, newMsg]);

    // AI Evaluation response
    setTimeout(() => {
      let reply = 'हम आपकी बात समझ रहे हैं। क्या आपके पास कोई सुरक्षित स्थान है?';
      let scoreBump = 3;

      const lower = text.toLowerCase();
      if (text === 'नहीं' || lower.includes('धमकी') || lower.includes('डर') || lower.includes('threat') || lower.includes('मदद')) {
        reply = 'हमने आपकी स्थिति को अत्यंत संवेदनशील दर्ज किया है। आपकी सुरक्षा हमारी प्राथमिकता है। क्या हम आपके पास तत्काल सहायता दल भेजें?';
        scoreBump = 6;
        triggerSosAlert(selectedCaseId, `Chatbot: Victim reported high distress response "${text}"`);
      } else if (text === 'बात नहीं करना चाहता/चाहती' || text === 'थोड़ा') {
        reply = 'कोई बात नहीं। आप जब चाहें हमसे बात कर सकते हैं। आप 14566 पर कभी भी कॉल कर सकते हैं।';
        scoreBump = 1;
      } else if (text === 'हाँ') {
        reply = 'यह जानकर राहत मिली। क्या आज आपको कोई अन्य सहायता या कानूनी जानकारी चाहिए?';
        scoreBump = -2;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: ['हाँ, तत्काल मदद भेजें', 'काउंसलर से बात कराएं', 'मैं ठीक हूँ']
        }
      ]);

      if (scoreBump !== 0) {
        updateCaseScore(selectedCaseId, scoreBump, `Chatbot response: "${text}"`);
      }
    }, 900);
  };

  return (
    <AppContext.Provider
      value={{
        cases,
        selectedCase,
        setSelectedCaseById,
        updateCaseScore,
        addInterventionToCase,
        alerts,
        markAlertRead,
        triggerSosAlert,
        unreadAlertsCount,
        counsellors,
        activeNavTab,
        setActiveNavTab,
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        isAssignModalOpen,
        setIsAssignModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isSosModalOpen,
        setIsSosModalOpen,
        isSelfAssessmentOpen,
        setIsSelfAssessmentOpen,
        viewMode,
        setViewMode,
        chatMessages,
        sendChatMessage,
        resetChat,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
