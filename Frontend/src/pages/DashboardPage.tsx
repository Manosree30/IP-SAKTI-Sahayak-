import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  BookOpen, 
  Building2, 
  Leaf, 
  Globe, 
  ExternalLink,
  User,
  Languages,
  Target,
  GitFork,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AUTHORITATIVE_SOURCES, HOW_IT_WORKS_STEPS } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { setCurrentTab, setSelectedDomainKey, toggleChat, t } = useApp();

  const handleDomainCardClick = (domainKey: string) => {
    setSelectedDomainKey(domainKey);
    setCurrentTab('detailed');
  };

  const domainCards = [
    {
      id: 'patent',
      title: t.patent,
      desc: t.patentDesc,
      icon: ShieldAlert,
      tag: 'Section 3(p) & Prior Art',
      color: 'from-[#8E241C]/10 to-transparent'
    },
    {
      id: 'tk',
      title: t.tk,
      desc: t.tkDesc,
      icon: BookOpen,
      tag: 'TKDL & Samhitas',
      color: 'from-[#B8955A]/15 to-transparent'
    },
    {
      id: 'ayush',
      title: t.ayush,
      desc: t.ayushDesc,
      icon: Building2,
      tag: 'Rule 158B & GMP',
      color: 'from-[#4A2117]/10 to-transparent'
    },
    {
      id: 'biodiversity',
      title: t.biodiversity,
      desc: t.biodiversityDesc,
      icon: Leaf,
      tag: 'NBA Prior Approval',
      color: 'from-[#3A5A27]/15 to-transparent'
    },
    {
      id: 'international',
      title: t.international,
      desc: t.internationalDesc,
      icon: Globe,
      tag: 'US FDA / EU THMPD',
      color: 'from-[#B8955A]/15 to-transparent'
    }
  ];

  // Map step icon string to Lucide component
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User className="w-4 h-4 text-[#8E241C]" />;
      case 'Languages': return <Languages className="w-4 h-4 text-[#8E241C]" />;
      case 'Target': return <Target className="w-4 h-4 text-[#8E241C]" />;
      case 'GitFork': return <GitFork className="w-4 h-4 text-[#8E241C]" />;
      case 'Search': return <Search className="w-4 h-4 text-[#8E241C]" />;
      case 'SlidersHorizontal': return <SlidersHorizontal className="w-4 h-4 text-[#8E241C]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-[#8E241C]" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#8E241C]" />;
      default: return <Sparkles className="w-4 h-4 text-[#8E241C]" />;
    }
  };

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-7xl mx-auto space-y-12">
      {/* 1. HERO SECTION with Staggered Fade-Down Animations */}
      <section className="relative overflow-hidden pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-8 space-y-5">
            {/* Step 1: Breadcrumb / small label */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold tracking-widest uppercase border border-[#8E241C]/25"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E241C]" />
              {t.tagline}
            </motion.div>

            {/* Step 2: Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#3A160F] tracking-tight leading-[1.18]"
            >
              Protect Your Ayurveda Innovation <br className="hidden sm:inline" />
              with <span className="text-[#8E241C] italic">Intelligence</span>
            </motion.h1>

            {/* Step 3: Description */}
            <motion.p
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.20 }}
              className="text-sm sm:text-base text-[#523326] max-w-2xl leading-relaxed font-sans"
            >
              {t.heroSubtext}
            </motion.p>

            {/* Buttons Row with individual staggered delays */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Step 4: Analyze My Formulation button */}
              <motion.button
                id="hero-analyze-btn"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.28 }}
                onClick={() => setCurrentTab('analyze')}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#8E241C] to-[#6F1D18] hover:from-[#781E17] hover:to-[#591612] text-[#FFF7EC] font-semibold text-sm sm:text-base shadow-[0_4px_16px_rgba(142,36,28,0.35)] hover:shadow-[0_6px_22px_rgba(142,36,28,0.5)] transition-all duration-200 cursor-pointer"
              >
                <span>{t.analyzeBtn}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Step 5: Ask AyurGuard AI button */}
              <motion.button
                id="hero-ask-ai-btn"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 }}
                onClick={toggleChat}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFFDF9] hover:bg-[#F2E5D0] text-[#3A160F] font-semibold text-sm sm:text-base border border-[#CBB393] hover:border-[#8E241C] transition-all duration-200 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#8E241C]" />
                <span>{t.askAiBtn}</span>
              </motion.button>
            </div>
          </div>

          {/* Hero Right Visual: Botanical Illustration & Tag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-[#EFE0C5]/50 to-[#E4D1B1]/40 border border-[#D8C2A0]/80 shadow-sm text-center relative overflow-hidden"
          >
            {/* Subtle botanical branch artwork */}
            <div className="w-28 h-28 relative my-2">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M50 85 C50 55, 30 35, 15 25" stroke="#3A160F" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M50 70 C55 50, 75 35, 85 25" stroke="#3A160F" strokeWidth="2" strokeLinecap="round" />
                {/* Leaves */}
                <path d="M15 25 C12 18, 25 15, 28 22 C30 28, 20 30, 15 25 Z" fill="#6E9952" stroke="#42662C" strokeWidth="1" />
                <path d="M28 42 C22 36, 32 30, 37 36 C40 42, 33 46, 28 42 Z" fill="#7FAA5D" stroke="#42662C" strokeWidth="0.8" />
                <path d="M85 25 C88 18, 75 15, 72 22 C70 28, 80 30, 85 25 Z" fill="#6E9952" stroke="#42662C" strokeWidth="1" />
                <path d="M72 42 C78 36, 68 30, 63 36 C60 42, 67 46, 72 42 Z" fill="#7FAA5D" stroke="#42662C" strokeWidth="0.8" />
                <circle cx="50" cy="85" r="4" fill="#8E241C" />
              </svg>
            </div>
            <p className="font-serif text-lg font-bold text-[#3A160F]">
              Traditional Knowledge <br />
              <span className="text-[#8E241C] italic font-sans text-base">Meets Modern AI</span>
            </p>
            <p className="text-xs text-[#6F4E3E] mt-2 max-w-xs">
              Bridging centuries of classical Ayurvedic compendiums with statutory patent prior art & global regulatory rules.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step 6: DOMAIN CARDS (5 Major Domains from Reference Image) */}
      <motion.section 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.42 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3A160F]">
            Regulatory & IP Intelligence Domains
          </h2>
          <span className="text-xs text-[#8C6D5F] font-medium hidden sm:inline">
            Click any domain to inspect statutory references
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {domainCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                id={`domain-card-${card.id}`}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.46 + idx * 0.05 }}
                onClick={() => handleDomainCardClick(card.id)}
                className="group relative bg-[#FFFDF9] rounded-2xl p-5 border border-[#E0CFB3] hover:border-[#8E241C] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
              >
                {/* Top Subtle Gradient */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.color}`} />

                <div>
                  {/* Icon & Tag */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F6EFE3] group-hover:bg-[#8E241C] text-[#8E241C] group-hover:text-[#FFF7EC] flex items-center justify-center transition-colors duration-200 border border-[#D8C2A0]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider text-[#8C6D5F] bg-[#F6EFE3] px-2 py-0.5 rounded-full border border-[#E0CFB3]">
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base font-bold text-[#3A160F] group-hover:text-[#8E241C] transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#63483D] mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Action Arrow */}
                <div className="pt-4 mt-2 flex items-center justify-end text-xs font-semibold text-[#8E241C] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Step 7: HOW AYURGUARD WORKS (Horizontal Pipeline Visualization) */}
      <motion.section 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.55 }}
        className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E0CFB3] shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE0D0] pb-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#3A160F] flex items-center gap-2">
              <GitFork className="w-5 h-5 text-[#8E241C]" />
              <span>{t.howItWorks}</span>
            </h2>
            <p className="text-xs text-[#7A5B4C] mt-1">
              Evidence retrieval pipeline grounding guidance into statutory gazettes and classical Ayurvedic records.
            </p>
          </div>
          <span className="text-[11px] text-[#8E241C] font-semibold bg-[#8E241C]/10 px-3 py-1 rounded-full self-start sm:self-center">
            8-Stage Intelligence Pipeline
          </span>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center text-center p-3 rounded-2xl bg-[#F8F3EA] border border-[#E6D8C3] hover:border-[#8E241C] transition-colors"
            >
              {/* Step indicator */}
              <div className="w-9 h-9 rounded-xl bg-[#FFFDF9] shadow-sm flex items-center justify-center border border-[#D8C2A0] mb-2.5">
                {getStepIcon(step.icon)}
              </div>
              <span className="text-[9px] font-mono font-bold text-[#8E241C] mb-0.5">
                STEP {step.stepNumber}
              </span>
              <h4 className="text-xs font-semibold text-[#3A160F] leading-tight">
                {step.title}
              </h4>
              <p className="text-[10px] text-[#7A5B4C] mt-1 line-clamp-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Step 8: AUTHORITATIVE SOURCES (6 Key Institutions) */}
      <motion.section 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.65 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3A160F]">
              {t.authoritativeSources}
            </h2>
            <p className="text-xs text-[#7A5B4C] mt-0.5">
              Official statutory portals, patent databases, and pharmacopoeial repositories
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AUTHORITATIVE_SOURCES.map((source) => (
            <div
              key={source.id}
              className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E0CFB3] hover:border-[#B8955A] shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#8E241C]/10 text-[#8E241C] font-serif font-bold text-xs">
                    {source.code}
                  </span>
                  <span className="text-[10px] text-[#8C6D5F] font-medium bg-[#F6EFE3] px-2 py-0.5 rounded-full border border-[#E6D8C3]">
                    {source.sourceType}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#3A160F] font-serif">
                  {source.fullName}
                </h3>
                <p className="text-xs text-[#63483D] mt-2 leading-relaxed">
                  {source.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#F0E5D4] flex items-center justify-between">
                <span className="text-[10px] text-[#2E6B20] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#2E6B20]" />
                  <span>Authoritative Source Portal</span>
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#8E241C] hover:text-[#5C1611] transition-colors"
                >
                  <span>Open Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
