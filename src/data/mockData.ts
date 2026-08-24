import { VictimCase, AlertItem, Counsellor } from '../types';

export const INITIAL_CASES: VictimCase[] = [
  {
    id: 'NHAA-24-56876',
    name: 'Seema K.',
    age: 28,
    gender: 'Female',
    district: 'Kaushambi, UP',
    state: 'Uttar Pradesh',
    registeredDate: '12 Feb 2024',
    status: 'Investigation',
    currentDistressScore: 92,
    riskLevel: 'High',
    phone: '+91 98765 43210',
    preferredLanguage: 'Hindi',
    assignedOfficer: 'Devendra Singh (DSP, Kaushambi)',
    assignedCounsellor: 'Dr. Priya Sharma (Nodal Senior Clinical Psychologist)',
    nhaaReferenceId: 'NHAA-14566-UP-876',
    escalationTrend: 'Increasing',
    distressTimeline: [
      { date: '01 May 2024', score: 54, level: 'Moderate', note: 'Standard bi-weekly check-in via chatbot. Mild anxiety reported.', triggerEvent: 'Court summons notification received' },
      { date: '02 May 2024', score: 61, level: 'Moderate', note: 'Victim noted repeated calls from unknown numbers.', triggerEvent: 'Anonymous phone calls' },
      { date: '03 May 2024', score: 72, level: 'High', note: 'Sharp rise in stress index. Speech acoustic analysis showed 34% tremor elevation.', triggerEvent: 'Accused family visited local market nearby' },
      { date: '04 May 2024', score: 81, level: 'High', note: 'Victim expressed severe dread regarding trial witness deposition.', triggerEvent: 'Witness testimony schedule confirmed for 18 May' },
      { date: '05 May 2024', score: 88, level: 'High', note: 'Direct intimidation reported via SMS gateway. Escalation protocol initiated.', triggerEvent: 'Direct threat received outside residence' },
      { date: '06 May 2024', score: 92, level: 'High', note: 'Immediate red flag. SOS alert dispatched to District Nodal Officer.', triggerEvent: 'Critical fear spike during morning IVRS voice check' }
    ],
    topRiskFactors: [
      { factor: 'Threats / Intimidation', percentage: 68 },
      { factor: 'Court Related Stress', percentage: 54 },
      { factor: 'Delays in Investigation/Trial', percentage: 49 },
      { factor: 'Economic Hardship', percentage: 37 },
      { factor: 'Social Ostracism', percentage: 32 }
    ],
    aiAnalysis: {
      primaryEmotions: ['Severe Acute Fear (88%)', 'Hopelessness (74%)', 'Hypervigilance (91%)'],
      threatConfidence: 94.6,
      acousticBiomarkers: [
        'Vocal tremor score: 8.4/10 (High)',
        'Fundamental frequency variance (Jitter): +42% elevated',
        'Speech latency: 2.8s pause before answering safety questions'
      ],
      sentimentTrend: 'Rapid negative deterioration over 72 hours with explicit threat indicators',
      summary: 'AI detected multi-modal distress signals across Chatbot text syntax and IVRS voice tone. Key phrases indicating intimidation ("डर लग रहा है", "घर के पास आए थे", "धमकी दी") triggered auto-escalation to High Risk Level 92/100.',
      keyFlags: ['Urgent Physical Protection', 'Trauma Counselling', 'Police Escort for Deposition']
    },
    recommendedInterventions: [
      { id: 'int-1', title: 'Immediate Counselling Session', priority: 'High Priority', category: 'Counselling', status: 'In Progress', assignedTo: 'Dr. Priya Sharma', dueDate: 'Today, 2:00 PM' },
      { id: 'int-2', title: 'Safety Assessment / Protection', priority: 'High Priority', category: 'Protection', status: 'Pending', assignedTo: 'SHO Kaushambi PS', dueDate: 'Within 4 Hours' },
      { id: 'int-3', title: 'Legal Aid Follow-up', priority: 'Medium Priority', category: 'Legal', status: 'Pending', assignedTo: 'DLSA Kaushambi', dueDate: '09 May 2024' },
      { id: 'int-4', title: 'Financial Assistance Review', priority: 'Medium Priority', category: 'Financial', status: 'In Progress', assignedTo: 'District Welfare Board', dueDate: '12 May 2024' },
      { id: 'int-5', title: 'Regular Follow-up (3 days)', priority: 'High Priority', category: 'Follow-up', status: 'Pending', assignedTo: 'AAVYA Automated IVRS', dueDate: '09 May 2024' }
    ],
    interactions: [
      { id: 'ix-1', channel: 'IVRS', timestamp: '06 May 2024, 11:32 AM', summary: 'Voice call check-in completed. Victim pressed 3 ("Very Distressed") and spoke of threatening encounters.', sentiment: 'Critical', distressScore: 92, language: 'Hindi', flaggedKeywords: ['परेशान', 'धमकी', 'डर', 'मदद'] },
      { id: 'ix-2', channel: 'Chatbot', timestamp: '06 May 2024, 11:31 AM', summary: 'Chat session via Web Portal. Replied "मन बहुत परेशान है..." and "बात नहीं करना चाहती".', sentiment: 'Distressed', distressScore: 90, language: 'Hindi', flaggedKeywords: ['मन परेशान', 'असुरक्षित'] },
      { id: 'ix-3', channel: 'SMS', timestamp: '05 May 2024, 04:15 PM', summary: 'Periodic SMS check responded with code 4 ("बहुत परेशान").', sentiment: 'Critical', distressScore: 88, language: 'Hindi', flaggedKeywords: ['Option 4'] },
      { id: 'ix-4', channel: 'Mobile App', timestamp: '04 May 2024, 08:30 PM', summary: 'Logged into AAVYA mobile app, reviewed safety checklist.', sentiment: 'Distressed', distressScore: 81, language: 'Hindi', flaggedKeywords: ['सुरक्षा', 'परामर्श'] }
    ],
    documents: [
      { id: 'doc-1', title: 'FIR No. 104/2024 - Kaushambi Police Station.pdf', type: 'FIR', date: '12 Feb 2024', size: '2.4 MB', status: 'Verified' },
      { id: 'doc-2', title: 'District Hospital Forensic & Medico-Legal Report.pdf', type: 'Medical', date: '14 Feb 2024', size: '4.8 MB', status: 'Verified' },
      { id: 'doc-3', title: 'Witness Threat Assessment & Escort Order.pdf', type: 'Protection', date: '05 May 2024', size: '1.1 MB', status: 'Pending Review' },
      { id: 'doc-4', title: 'DLSA Free Legal Aid Counsel Assignment Letter.pdf', type: 'Legal', date: '20 Feb 2024', size: '850 KB', status: 'Verified' }
    ],
    notes: [
      { date: '06 May 2024, 10:15 AM', author: 'Dr. Priya Sharma', role: 'Clinical Psychologist', content: 'Patient exhibiting heightened panic symptoms during phone follow-up. Recommended immediate in-person psycho-social support session and family safety review.' },
      { date: '05 May 2024, 05:40 PM', author: 'Devendra Singh', role: 'DSP Nodal Officer', content: 'Patrol beat constable dispatched to residence after threat escalation alert received from AAVYA AI engine.' }
    ]
  },
  {
    id: 'NHAA-24-56812',
    name: 'Ramesh B.',
    age: 34,
    gender: 'Male',
    district: 'Prayagraj, UP',
    state: 'Uttar Pradesh',
    registeredDate: '24 Jan 2024',
    status: 'Trial',
    currentDistressScore: 89,
    riskLevel: 'High',
    phone: '+91 98221 11098',
    preferredLanguage: 'Hindi',
    assignedOfficer: 'Rajesh Kumar (ACP Prayagraj)',
    assignedCounsellor: 'Dr. Ananya Verma',
    nhaaReferenceId: 'NHAA-14566-UP-812',
    escalationTrend: 'Increasing',
    distressTimeline: [
      { date: '01 May 2024', score: 65, level: 'Moderate' },
      { date: '02 May 2024', score: 70, level: 'High' },
      { date: '03 May 2024', score: 75, level: 'High' },
      { date: '04 May 2024', score: 82, level: 'High' },
      { date: '05 May 2024', score: 86, level: 'High' },
      { date: '06 May 2024', score: 89, level: 'High' }
    ],
    topRiskFactors: [
      { factor: 'Threats / Intimidation', percentage: 72 },
      { factor: 'Economic Hardship', percentage: 61 },
      { factor: 'Court Related Stress', percentage: 48 },
      { factor: 'Social Ostracism', percentage: 40 },
      { factor: 'Delays in Investigation/Trial', percentage: 35 }
    ],
    aiAnalysis: {
      primaryEmotions: ['Severe Anxiety (84%)', 'Economic Distress (78%)'],
      threatConfidence: 89.2,
      acousticBiomarkers: ['High vocal pitch instability', 'Rapid speech rate'],
      sentimentTrend: 'Continuous escalation driven by loss of daily livelihood and court summons.',
      summary: 'Victim under severe economic strain after harassment incidents prevented him from running small shop.',
      keyFlags: ['Economic Relief Scheme', 'Court Hearing Support']
    },
    recommendedInterventions: [
      { id: 'int-201', title: 'Immediate Counselling Session', priority: 'High Priority', category: 'Counselling', status: 'Pending' },
      { id: 'int-202', title: 'Victim Compensation Scheme Filing', priority: 'High Priority', category: 'Financial', status: 'In Progress' }
    ],
    interactions: [],
    documents: [],
    notes: []
  },
  {
    id: 'NHAA-24-56789',
    name: 'Pooja M.',
    age: 22,
    gender: 'Female',
    district: 'Varanasi, UP',
    state: 'Uttar Pradesh',
    registeredDate: '05 Mar 2024',
    status: 'Investigation',
    currentDistressScore: 85,
    riskLevel: 'High',
    phone: '+91 97654 32190',
    preferredLanguage: 'Hindi',
    assignedOfficer: 'Smt. Vandana Mishra (Insp.)',
    assignedCounsellor: 'Dr. Sunita Rao',
    nhaaReferenceId: 'NHAA-14566-UP-789',
    escalationTrend: 'Increasing',
    distressTimeline: [
      { date: '01 May 2024', score: 58, level: 'Moderate' },
      { date: '02 May 2024', score: 64, level: 'Moderate' },
      { date: '03 May 2024', score: 71, level: 'High' },
      { date: '04 May 2024', score: 79, level: 'High' },
      { date: '05 May 2024', score: 82, level: 'High' },
      { date: '06 May 2024', score: 85, level: 'High' }
    ],
    topRiskFactors: [
      { factor: 'Social Ostracism', percentage: 76 },
      { factor: 'Threats / Intimidation', percentage: 65 },
      { factor: 'Court Related Stress', percentage: 51 },
      { factor: 'Economic Hardship', percentage: 34 },
      { factor: 'Delays in Investigation/Trial', percentage: 30 }
    ],
    aiAnalysis: {
      primaryEmotions: ['Severe Isolation (90%)', 'Depression (75%)'],
      threatConfidence: 86.4,
      acousticBiomarkers: ['Hypophonic tone', 'Flattened affect'],
      sentimentTrend: 'Heavy social pressure from village elders to withdraw complaint.',
      summary: 'Victim reports intense community ostracism and needs immediate shelter or safe-house relocation.',
      keyFlags: ['Safe House Relocation', 'Women Helpline 181 Coordination']
    },
    recommendedInterventions: [
      { id: 'int-301', title: 'One Stop Centre (Sakhi) Shelter Assessment', priority: 'High Priority', category: 'Protection', status: 'Pending' },
      { id: 'int-302', title: 'Trauma & Depression Therapy', priority: 'High Priority', category: 'Counselling', status: 'Pending' }
    ],
    interactions: [],
    documents: [],
    notes: []
  },
  {
    id: 'NHAA-24-56701',
    name: 'Savitri D.',
    age: 45,
    gender: 'Female',
    district: 'Lucknow, UP',
    state: 'Uttar Pradesh',
    registeredDate: '19 Jan 2024',
    status: 'Trial',
    currentDistressScore: 83,
    riskLevel: 'High',
    phone: '+91 94150 88231',
    preferredLanguage: 'Hindi',
    assignedOfficer: 'Alok Pandey (ACP Crime)',
    assignedCounsellor: 'Dr. Priya Sharma',
    nhaaReferenceId: 'NHAA-14566-UP-701',
    escalationTrend: 'Increasing',
    distressTimeline: [
      { date: '01 May 2024', score: 50, level: 'Moderate' },
      { date: '02 May 2024', score: 58, level: 'Moderate' },
      { date: '03 May 2024', score: 67, level: 'Moderate' },
      { date: '04 May 2024', score: 74, level: 'High' },
      { date: '05 May 2024', score: 80, level: 'High' },
      { date: '06 May 2024', score: 83, level: 'High' }
    ],
    topRiskFactors: [
      { factor: 'Delays in Investigation/Trial', percentage: 70 },
      { factor: 'Court Related Stress', percentage: 62 },
      { factor: 'Threats / Intimidation', percentage: 55 },
      { factor: 'Economic Hardship', percentage: 41 },
      { factor: 'Social Ostracism', percentage: 29 }
    ],
    aiAnalysis: {
      primaryEmotions: ['Exhaustion (85%)', 'Court Procedural Anxiety (80%)'],
      threatConfidence: 81.0,
      acousticBiomarkers: ['Tremor detected on mentioning upcoming cross-examination'],
      sentimentTrend: 'Anxiety rising with impending high-court appeal date.',
      summary: 'Victim overwhelmed by procedural delays and legal paperwork.',
      keyFlags: ['Legal Aid Facilitator', 'Court Escort Assistance']
    },
    recommendedInterventions: [
      { id: 'int-401', title: 'Legal Aid Briefing Session', priority: 'High Priority', category: 'Legal', status: 'Pending' },
      { id: 'int-402', title: 'Tele-Counselling Session', priority: 'Medium Priority', category: 'Counselling', status: 'In Progress' }
    ],
    interactions: [],
    documents: [],
    notes: []
  },
  {
    id: 'NHAA-24-56655',
    name: 'Mahesh L.',
    age: 26,
    gender: 'Male',
    district: 'Kanpur Nagar, UP',
    state: 'Uttar Pradesh',
    registeredDate: '28 Feb 2024',
    status: 'Investigation',
    currentDistressScore: 81,
    riskLevel: 'High',
    phone: '+91 93350 11987',
    preferredLanguage: 'Hindi',
    assignedOfficer: 'Vikram Pratap (Insp.)',
    assignedCounsellor: 'Dr. Ananya Verma',
    nhaaReferenceId: 'NHAA-14566-UP-655',
    escalationTrend: 'Increasing',
    distressTimeline: [
      { date: '01 May 2024', score: 52, level: 'Moderate' },
      { date: '02 May 2024', score: 60, level: 'Moderate' },
      { date: '03 May 2024', score: 68, level: 'Moderate' },
      { date: '04 May 2024', score: 73, level: 'High' },
      { date: '05 May 2024', score: 78, level: 'High' },
      { date: '06 May 2024', score: 81, level: 'High' }
    ],
    topRiskFactors: [
      { factor: 'Threats / Intimidation', percentage: 64 },
      { factor: 'Economic Hardship', percentage: 58 },
      { factor: 'Court Related Stress', percentage: 46 },
      { factor: 'Social Ostracism', percentage: 38 },
      { factor: 'Delays in Investigation/Trial', percentage: 31 }
    ],
    aiAnalysis: {
      primaryEmotions: ['Fear of Retaliation (86%)', 'Sleep Deprivation (72%)'],
      threatConfidence: 84.5,
      acousticBiomarkers: ['Strained speech rate', 'Vocal pitch elevation'],
      sentimentTrend: 'Elevated stress following physical confrontation by associates of accused.',
      summary: 'Urgent security assessment required at workplace location.',
      keyFlags: ['Workplace Safety Protocol', 'Police Mobile Patrolling']
    },
    recommendedInterventions: [
      { id: 'int-501', title: 'Workplace Threat & Security Review', priority: 'High Priority', category: 'Protection', status: 'Pending' },
      { id: 'int-502', title: 'Stress & Trauma De-escalation', priority: 'Medium Priority', category: 'Counselling', status: 'Pending' }
    ],
    interactions: [],
    documents: [],
    notes: []
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    caseId: 'NHAA-24-56876',
    victimName: 'Seema K.',
    score: 92,
    riskTag: 'Just: HIGH',
    timestamp: 'Just now (11:32 AM)',
    district: 'Kaushambi, UP',
    triggerReason: 'IVRS Voice analysis detected vocal tremor spike + reported direct intimidation outside house.',
    unread: true
  },
  {
    id: 'alt-2',
    caseId: 'NHAA-24-56812',
    victimName: 'Ramesh B.',
    score: 89,
    riskTag: 'Risk: HIGH',
    timestamp: '18 mins ago',
    district: 'Prayagraj, UP',
    triggerReason: 'Severe economic hardship + threat message detected via SMS gateway.',
    unread: true
  },
  {
    id: 'alt-3',
    caseId: 'NHAA-24-56789',
    victimName: 'Pooja M.',
    score: 85,
    riskTag: 'Risk: HIGH',
    timestamp: '42 mins ago',
    district: 'Varanasi, UP',
    triggerReason: 'Social ostracism escalation reported during Chatbot check-in.',
    unread: false
  },
  {
    id: 'alt-4',
    caseId: 'NHAA-24-56701',
    victimName: 'Savitri D.',
    score: 83,
    riskTag: 'Risk: HIGH',
    timestamp: '2 hours ago',
    district: 'Lucknow, UP',
    triggerReason: 'High court appearance anxiety and lack of legal assistance.',
    unread: false
  },
  {
    id: 'alt-5',
    caseId: 'NHAA-24-56655',
    victimName: 'Mahesh L.',
    score: 81,
    riskTag: 'Risk: HIGH',
    timestamp: '3 hours ago',
    district: 'Kanpur Nagar, UP',
    triggerReason: 'Workplace safety concern flagged during IVRS interaction.',
    unread: false
  }
];

export const COUNSELLORS_LIST: Counsellor[] = [
  {
    id: 'c-1',
    name: 'Dr. Priya Sharma',
    specialty: 'Senior Clinical Psychologist (Trauma & Witness Support)',
    district: 'Kaushambi & Prayagraj',
    languages: ['Hindi', 'English', 'Bhojpuri'],
    activeCases: 14,
    rating: 4.9,
    availability: 'Available',
    avatar: 'https://images.unsplash.com/photo-1594824813591-0e1948512168?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'c-2',
    name: 'Dr. Ananya Verma',
    specialty: 'Crisis Intervention Specialist',
    district: 'Lucknow & Kanpur',
    languages: ['Hindi', 'English', 'Awadhi'],
    activeCases: 19,
    rating: 4.8,
    availability: 'Available',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'c-3',
    name: 'Dr. Sunita Rao',
    specialty: 'Women & Child Psychosocial Rehabilitation',
    district: 'Varanasi & Mirzapur',
    languages: ['Hindi', 'Bhojpuri', 'English'],
    activeCases: 11,
    rating: 4.9,
    availability: 'In Session',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'c-4',
    name: 'Dr. Rajesh Deshmukh',
    specialty: 'Forensic Psychologist & De-escalation Lead',
    district: 'Statewide Nodal Mobile Unit',
    languages: ['Hindi', 'Marathi', 'English'],
    activeCases: 8,
    rating: 5.0,
    availability: 'Available',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  }
];

export const SYSTEM_METRICS = {
  totalActiveCases: '18,743',
  totalActiveCasesDiff: '↑ 12% from last week',
  highRiskCases: '1,284',
  highRiskCasesDiff: '↑ 8% from last week',
  moderateRiskCases: '3,672',
  moderateRiskCasesDiff: '↑ 5% from last week',
  counsellingSessions: '2,458',
  counsellingSessionsDiff: '↑ 15% from last week',
  averageDistressScore: 62,
  distressBreakdown: {
    low: { count: '9,284', percentage: 49.5, range: '0-39' },
    moderate: { count: '6,175', percentage: 32.9, range: '40-69' },
    high: { count: '3,284', percentage: 17.6, range: '70-100' }
  },
  riskFactors: [
    { name: 'Threats / Intimidation', percentage: 68, color: 'bg-rose-500' },
    { name: 'Court Related Stress', percentage: 54, color: 'bg-orange-500' },
    { name: 'Delays in Investigation/Trial', percentage: 49, color: 'bg-amber-500' },
    { name: 'Economic Hardship', percentage: 37, color: 'bg-emerald-500' },
    { name: 'Social Ostracism', percentage: 32, color: 'bg-teal-500' }
  ],
  trend30Days: [
    { date: '08 Apr', avgScore: 54, highRiskCases: 28 },
    { date: '12 Apr', avgScore: 71, highRiskCases: 36 },
    { date: '15 Apr', avgScore: 60, highRiskCases: 42 },
    { date: '18 Apr', avgScore: 68, highRiskCases: 37 },
    { date: '22 Apr', avgScore: 59, highRiskCases: 39 },
    { date: '25 Apr', avgScore: 72, highRiskCases: 41 },
    { date: '29 Apr', avgScore: 55, highRiskCases: 33 },
    { date: '02 May', avgScore: 66, highRiskCases: 39 },
    { date: '06 May', avgScore: 74, highRiskCases: 45 }
  ]
};

export const MULTILINGUAL_TRANSLATIONS = {
  hi: {
    title: 'आव्या (AAVYA) – वर्किंग प्रोटोटाइप',
    subtitle: 'एआई-सहायित पीड़ित कल्याण एवं मूल्यांकन प्रणाली (AI-Assisted Victim Well-being & Assessment)',
    nhaaPortal: 'राष्ट्रीय मानवाधिकार हेल्पलाइन (14566) / एकीकृत पोर्टल से संबद्ध',
    chatbotTitle: '1. चैटबॉट (मोबाइल/वेब)',
    ivrsTitle: '2. आईवीआरएस कॉल (ध्वनि संवाद)',
    smsTitle: '3. एसएमएस चेक-इन (उदाहरण)',
    mobileTitle: '4. मोबाइल ऐप होम (पीड़ित दृश्य)',
    botGreeting: 'नमस्ते, मैं आपकी मदद के लिए यहाँ हूँ। आप कैसा महसूस कर रहे हैं आज?',
    botSafeQuery: 'क्या आप सुरक्षित महसूस कर रहे हैं? कृपया अपनी स्थिति बताएं।',
    quickResponses: ['हाँ', 'नहीं', 'थोड़ा', 'बात नहीं करना चाहता/चाहती'],
    typePlaceholder: 'संदेश लिखें...',
    ivrsConnected: 'कनेक्टेड... 11:32 AM',
    ivrsPrompt: 'आप अपनी वर्तमान स्थिति बताएं या 1 दबाएं',
    smsPrompt: 'AAVYA: कृपया बताएं आप अभी कैसा महसूस कर रहे हैं?\n1. अच्छा  2. सामान्य  3. परेशान  4. बहुत परेशान\nउत्तर दें: 1 / 2 / 3 / 4',
    appGreeting: 'नमस्ते सीमा, हम आपकी मदद के लिए यहाँ हैं।',
    appActions: {
      status: 'अपनी स्थिति बताएं',
      talk: 'मैं बात करना चाहता/चाहती हूँ',
      counselling: 'परामर्श से जुड़ें',
      help: 'सहायता सेवाएं'
    },
    appTabs: {
      home: 'होम',
      updates: 'अपडेट्स',
      support: 'सहायता',
      profile: 'प्रोफ़ाइल'
    }
  },
  en: {
    title: 'AAVYA — AI-Assisted Victim Well-being & Assessment',
    subtitle: 'AI-Assisted Victim Well-being & Assessment',
    nhaaPortal: 'Integrated with NHAA (14566) / Integrated Portal',
    chatbotTitle: '1. Chatbot (Mobile/Web)',
    ivrsTitle: '2. IVRS Call (Voice Interaction)',
    smsTitle: '3. SMS Check-in (Example)',
    mobileTitle: '4. Mobile App Home (Victim View)',
    botGreeting: 'Hello, I am here to help you. How are you feeling today?',
    botSafeQuery: 'Are you feeling safe right now? Please share your situation.',
    quickResponses: ['Yes', 'No', 'A Little', "Don't want to talk"],
    typePlaceholder: 'Type your message...',
    ivrsConnected: 'Connected... 11:32 AM',
    ivrsPrompt: 'Please speak your current situation or press 1',
    smsPrompt: 'AAVYA: Please let us know how you are feeling right now?\n1. Good  2. Normal  3. Distressed  4. Very Distressed\nReply: 1 / 2 / 3 / 4',
    appGreeting: 'Hello Seema, we are here to support you.',
    appActions: {
      status: 'Share Your Status',
      talk: 'I Want to Speak with Someone',
      counselling: 'Connect to Counsellor',
      help: 'Emergency Support Services'
    },
    appTabs: {
      home: 'Home',
      updates: 'Updates',
      support: 'Support',
      profile: 'Profile'
    }
  }
};
