import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NavigationTab, 
  LanguageCode, 
  FormulationInput, 
  AnalysisRecord, 
  ChatMessage, 
  DomainAnalysis 
} from '../types';
import { 
  DEFAULT_FORMULATION, 
  INITIAL_ANALYSIS_RESULT, 
  INITIAL_MY_ANALYSES,
  QUICK_QUESTIONS 
} from '../data/mockData';
import { translations, Translations } from '../i18n/translations';

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  avatarInitials: string;
}

export const getInitials = (name: string): string => {
  if (!name || !name.trim()) return 'AU';
  const clean = name.trim().replace(/^Dr\.\s*/i, '');
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'AU';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const DEFAULT_USER: UserProfile = {
  name: 'AyurGuard User',
  role: 'Researcher',
  email: 'researcher@ayurguard.org',
  avatarInitials: 'AU'
};

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedDomainKey: string;
  setSelectedDomainKey: (domainKey: string) => void;
  selectedDomain: DomainAnalysis;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  formulationInput: FormulationInput;
  setFormulationInput: React.Dispatch<React.SetStateAction<FormulationInput>>;
  currentAnalysis: AnalysisRecord;
  setCurrentAnalysis: React.Dispatch<React.SetStateAction<AnalysisRecord>>;
  savedAnalyses: AnalysisRecord[];
  saveAnalysis: (analysis: AnalysisRecord) => void;
  deleteAnalysis: (id: string) => void;
  loadAnalysis: (id: string) => void;
  
  // Loading & Mortar transition
  isLoadingScreen: boolean;
  setIsLoadingScreen: (loading: boolean) => void;
  isMortarTransitioning: boolean;
  setIsMortarTransitioning: (transitioning: boolean) => void;
  finishLoadingTransition: () => void;
  
  // Chat & Floating Assistant
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (question: string, domainContext?: string) => void;
  
  // Workflow Execution
  startFormulationAnalysis: (data: FormulationInput) => void;
  
  // Top search
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  
  // User & Auth
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  registerUser: (name: string, email: string) => void;
  loginUser: (email: string, enteredName?: string) => boolean;
  logoutUser: () => void;
  
  // Settings
  theme: 'light' | 'system' | 'dark';
  setTheme: (t: 'light' | 'system' | 'dark') => void;
  responsePreference: 'Concise' | 'Balanced' | 'Detailed';
  setResponsePreference: (p: 'Concise' | 'Balanced' | 'Detailed') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [selectedDomainKey, setSelectedDomainKey] = useState<string>('patent');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [formulationInput, setFormulationInput] = useState<FormulationInput>(DEFAULT_FORMULATION);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisRecord>(INITIAL_ANALYSIS_RESULT);
  const [savedAnalyses, setSavedAnalyses] = useState<AnalysisRecord[]>(INITIAL_MY_ANALYSES);
  
  // Initial loading screen starts as TRUE for the requested Ayurvedic Loading Experience
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(true);
  const [isMortarTransitioning, setIsMortarTransitioning] = useState<boolean>(false);
  
  // Floating Mortar Assistant Chat
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Namaste. I am AyurGuard AI, your Ayurvedic regulatory and intellectual property decision-support assistant. How may I guide your innovation today?',
      timestamp: 'Just now',
      suggestedQuestions: QUICK_QUESTIONS
    }
  ]);
  
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      localStorage.removeItem('ayurguard_user');
      const saved = localStorage.getItem('ayurguard_user_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && typeof parsed.name === 'string') {
          return {
            ...parsed,
            avatarInitials: getInitials(parsed.name)
          };
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_USER;
  });
  
  const [theme, setTheme] = useState<'light' | 'system' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('ayurguard_theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'light';
  });

  const [responsePreference, setResponsePreference] = useState<'Concise' | 'Balanced' | 'Detailed'>('Balanced');

  // Synchronize theme with documentElement and localStorage
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = theme === 'dark' || (theme === 'system' && isSystemDark);
      
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    try {
      localStorage.setItem('ayurguard_theme', theme);
    } catch {
      // ignore
    }

    if (theme === 'system') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => applyTheme();
      mql.addEventListener('change', listener);
      return () => mql.removeEventListener('change', listener);
    }
  }, [theme]);

  // Persist user changes
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('ayurguard_user_v2', JSON.stringify(user));
      }
    } catch {
      // ignore
    }
  }, [user]);

  const registerUser = (name: string, email: string) => {
    const cleanName = name && name.trim() ? name.trim() : 'AyurGuard User';
    const cleanEmail = email && email.trim() ? email.trim().toLowerCase() : 'researcher@ayurguard.org';
    const initials = getInitials(cleanName);
    const newUser: UserProfile = {
      name: cleanName,
      role: 'Researcher',
      email: cleanEmail,
      avatarInitials: initials
    };
    setUser(newUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('ayurguard_user_v2', JSON.stringify(newUser));
      const accountsJson = localStorage.getItem('ayurguard_registered_accounts') || '{}';
      const accounts = JSON.parse(accountsJson);
      accounts[cleanEmail] = {
        name: cleanName,
        email: cleanEmail,
        role: 'Researcher',
        avatarInitials: initials
      };
      localStorage.setItem('ayurguard_registered_accounts', JSON.stringify(accounts));
    } catch {
      // ignore
    }
  };

  const loginUser = (email: string, enteredName?: string): boolean => {
    const cleanEmail = email && email.trim() ? email.trim().toLowerCase() : '';
    let resolvedName = enteredName && enteredName.trim() ? enteredName.trim() : '';

    try {
      const accountsJson = localStorage.getItem('ayurguard_registered_accounts') || '{}';
      const accounts = JSON.parse(accountsJson);
      if (cleanEmail && accounts[cleanEmail] && accounts[cleanEmail].name) {
        resolvedName = accounts[cleanEmail].name;
      }
    } catch {
      // ignore
    }

    const finalName = resolvedName || (enteredName && enteredName.trim()) || 'AyurGuard User';
    const initials = getInitials(finalName);
    const loggedInUser: UserProfile = {
      name: finalName,
      role: 'Researcher',
      email: cleanEmail || 'researcher@ayurguard.org',
      avatarInitials: initials
    };
    setUser(loggedInUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('ayurguard_user_v2', JSON.stringify(loggedInUser));
    } catch {
      // ignore
    }
    return true;
  };

  const logoutUser = () => {
    setUser(DEFAULT_USER);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('ayurguard_user_v2');
    } catch {
      // ignore
    }
  };

  // Trigger loading completion and mortar transition after 2.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoadingTransition();
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const finishLoadingTransition = () => {
    setIsMortarTransitioning(true);
    setIsLoadingScreen(false);
    setTimeout(() => {
      setIsMortarTransitioning(false);
    }, 900);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const sendChatMessage = (question: string, domainContext?: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: 'Just now'
    };
    
    setChatMessages(prev => [...prev, userMsg]);

    // Simulated contextual evidence-grounded response
    setTimeout(() => {
      const qLower = question.toLowerCase();
      let responseText = '';
      let finding = '';
      let citations = currentAnalysis.domains.patent.citations;
      let domain = 'Patent & Traditional Knowledge';

      if (qLower.includes('patent') || qLower.includes('patentability')) {
        finding = 'Requires novelty proof & synergy validation (Section 3(p) & 3(e))';
        responseText = 'Under the Indian Patents Act 1970, pure aggregations of known traditional herbs are deemed non-patentable. To overcome Section 3(p) and Section 3(e), you must present comparative experimental data demonstrating non-obvious synergistic technical efficacy.';
        citations = currentAnalysis.domains.patent.citations;
        domain = 'Patent';
      } else if (qLower.includes('traditional') || qLower.includes('tkdl') || qLower.includes('classical')) {
        finding = 'Classical references indexed in TKDL corpus';
        responseText = 'Formulations containing classical herbs like Withania somnifera and Curcuma longa are extensively cataloged in the Traditional Knowledge Digital Library (TKDL) mapped to Charaka Samhita and Ashtanga Hridaya. Prior clearance search is strongly recommended.';
        citations = currentAnalysis.domains.tk.citations;
        domain = 'Traditional Knowledge';
      } else if (qLower.includes('ayush') || qLower.includes('license') || qLower.includes('gmp')) {
        finding = 'Rule 158B & Schedule T GMP compliance mandatory';
        responseText = 'Manufacturing in India requires a valid Ayurvedic license under Drugs & Cosmetics Rules 1945. Proprietary medicines necessitate proof of safety and effectiveness, plus adherence to Ayurvedic Pharmacopoeia of India (API) microbial and heavy metal thresholds.';
        citations = currentAnalysis.domains.ayush.citations;
        domain = 'AYUSH Regulation';
      } else if (qLower.includes('biodiversity') || qLower.includes('nba') || qLower.includes('biological')) {
        finding = 'Section 6 NBA approval required for IPR & commercialization';
        responseText = 'Under Section 6 of the Biological Diversity Act 2002, any patent application or commercial utilization of biological resources sourced from India requires prior authorization from the National Biodiversity Authority (Form III).';
        citations = currentAnalysis.domains.biodiversity.citations;
        domain = 'Biodiversity';
      } else if (qLower.includes('international') || qLower.includes('usa') || qLower.includes('export')) {
        finding = 'Dietary supplement standards (US FDA 21 CFR 111 / EU Directive 2004/24/EC)';
        responseText = 'In the US, Ayurvedic formulations are typically marketed as Dietary Supplements under DSHEA 1994, strictly avoiding disease-treatment claims. In the EU, the Traditional Herbal Medicinal Products Directive applies with documentation of 30-year safe traditional usage.';
        citations = currentAnalysis.domains.international.citations;
        domain = 'International';
      } else {
        finding = 'Evidence-backed multi-domain assessment';
        responseText = `Regarding "${question}": In Ayurvedic regulatory intelligence, evaluate three concurrent vectors: 1) Non-patentability hurdles under Section 3(p), 2) National Biodiversity Authority clearance under BDA 2002, and 3) Rule 158B licensing under AYUSH guidelines.`;
        citations = [currentAnalysis.domains.patent.citations[0], currentAnalysis.domains.tk.citations[0]];
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
        finding,
        domain,
        evidenceStrength: 'Strong',
        citations,
        suggestedQuestions: [
          'What prior art exists for this formulation in TKDL?',
          'What are the exact testing parameters under Rule 158B?',
          'How do I file Form III with National Biodiversity Authority?'
        ]
      };

      setChatMessages(prev => [...prev, assistantMsg]);
    }, 700);
  };

  const startFormulationAnalysis = (input: FormulationInput) => {
    setFormulationInput(input);
    setCurrentTab('processing');
  };

  const saveAnalysis = (analysis: AnalysisRecord) => {
    setSavedAnalyses(prev => [analysis, ...prev.filter(a => a.id !== analysis.id)]);
  };

  const deleteAnalysis = (id: string) => {
    setSavedAnalyses(prev => prev.filter(a => a.id !== id));
  };

  const loadAnalysis = (id: string) => {
    const found = savedAnalyses.find(a => a.id === id);
    if (found) {
      setCurrentAnalysis(found);
      setFormulationInput({
        productName: found.productName,
        ingredients: found.ingredients.join(', '),
        purpose: found.purpose,
        claims: 'Antioxidant, Adaptogenic, Cellular Protection',
        dosageForm: found.dosageForm,
        targetCountry: found.targetCountry,
        additionalCountries: found.additionalCountries,
        question: found.question
      });
      setCurrentTab('results');
    }
  };

  const selectedDomain: DomainAnalysis = 
    currentAnalysis.domains[selectedDomainKey] || currentAnalysis.domains.patent;

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedDomainKey,
        setSelectedDomainKey,
        selectedDomain,
        language,
        setLanguage,
        t,
        formulationInput,
        setFormulationInput,
        currentAnalysis,
        setCurrentAnalysis,
        savedAnalyses,
        saveAnalysis,
        deleteAnalysis,
        loadAnalysis,
        
        isLoadingScreen,
        setIsLoadingScreen,
        isMortarTransitioning,
        setIsMortarTransitioning,
        finishLoadingTransition,
        
        isChatOpen,
        setIsChatOpen,
        toggleChat,
        chatMessages,
        sendChatMessage,
        
        startFormulationAnalysis,
        globalSearch,
        setGlobalSearch,
        
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAuthenticated,
        setIsAuthenticated,
        registerUser,
        loginUser,
        logoutUser,
        
        theme,
        setTheme,
        responsePreference,
        setResponsePreference,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
