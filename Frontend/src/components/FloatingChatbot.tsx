import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  ShieldAlert, 
  ExternalLink, 
  Minimize2, 
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { MortarPestleGraphic } from './MortarPestleGraphic';
import { useApp } from '../context/AppContext';

export const FloatingChatbot: React.FC = () => {
  const { 
    isChatOpen, 
    toggleChat, 
    chatMessages, 
    sendChatMessage, 
    isMortarTransitioning,
    isLoadingScreen,
    setCurrentTab
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal.trim());
    setInputVal('');
  };

  const handleQuickQuestion = (q: string) => {
    sendChatMessage(q);
  };

  // If loading screen is currently showing, we don't render the static button yet
  if (isLoadingScreen) return null;

  return (
    <>
      {/* Floating Mortar & Pestle Assistant Button in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center justify-end">
        <div className="relative group">
          {/* Tooltip */}
          {!isChatOpen && (
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center">
              <div className="bg-[#3A160F] text-[#F5E8D2] text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-[#B8955A]/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E2C78E]" />
                <span>Ask AyurGuard AI</span>
              </div>
              <div className="w-2 h-2 bg-[#3A160F] rotate-45 -ml-1 border-r border-t border-[#B8955A]/40" />
            </div>
          )}

          {/* Persistent Floating Mortar & Pestle Button */}
          <motion.button
            id="mortar-assistant-btn"
            onClick={toggleChat}
            initial={
              isMortarTransitioning 
                ? { x: -350, y: -250, scale: 2.2, opacity: 0.9 } 
                : { scale: 0.9, opacity: 0 }
            }
            animate={{ 
              x: 0, 
              y: [0, -4, 0], 
              scale: 1, 
              opacity: 1 
            }}
            transition={{
              x: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 }
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#4A2117] via-[#3A160F] to-[#250F0A] p-1.5 shadow-[0_8px_25px_rgba(58,22,15,0.45)] border-2 border-[#B8955A]/50 focus:outline-none cursor-pointer transition-shadow hover:shadow-[0_12px_30px_rgba(142,36,28,0.5)]`}
            aria-label="Ask AyurGuard AI"
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8E241C]/30 to-[#B8955A]/20 pointer-events-none" />

            {/* Mortar graphic inside floating badge */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              <MortarPestleGraphic size={52} glow={false} />
            </div>

            {/* Notification pulse badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8E241C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#8E241C] border-2 border-[#F6EFE3] text-[9px] font-bold text-white items-center justify-center">
                AI
              </span>
            </span>
          </motion.button>
        </div>
      </div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            id="ayurguard-chat-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed z-50 bottom-24 right-4 sm:right-6 bg-[#FAF4EB] dark:bg-[#1E0F0B] border border-[#B8955A]/40 dark:border-[#B8955A]/30 rounded-2xl shadow-[0_20px_50px_rgba(43,26,20,0.35)] flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded 
                ? 'w-[95vw] sm:w-[620px] h-[80vh] max-h-[720px]' 
                : 'w-[92vw] sm:w-[410px] h-[540px]'
            }`}
          >
            {/* Header: Deep Wood Brown & Ayurvedic Gold */}
            <div className="bg-gradient-to-r from-[#3A160F] via-[#4A2117] to-[#3A160F] text-[#F5E8D2] px-4 py-3.5 flex items-center justify-between border-b border-[#B8955A]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#8E241C] p-1 flex items-center justify-center border border-[#B8955A]/30 shadow-inner">
                  <MortarPestleGraphic size={30} glow={false} />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-[#F5E8D2] tracking-wide flex items-center gap-1.5">
                    AyurGuard AI
                    <span className="text-[10px] bg-[#8E241C]/80 text-[#FFF7EC] px-1.5 py-0.5 rounded font-sans font-medium">
                      Decision Support
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#E6D3B3]/75 font-sans">
                    Regulatory & IP Intelligence Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#E6D3B3]">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:text-[#FFF7EC] hover:bg-white/10 rounded transition-colors"
                  title={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:text-[#FFF7EC] hover:bg-white/10 rounded transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="bg-[#EFE0C5]/70 dark:bg-[#2A140F] border-b border-[#D8C2A0] dark:border-[#3E1E17] px-3 py-2 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
              <span className="text-[#6F1D18] dark:text-[#E2C78E] font-semibold whitespace-nowrap">Quick:</span>
              {[
                { label: 'Patentability', query: 'Can this Ayurveda formulation be patented?' },
                { label: 'TKDL Overlap', query: 'What traditional knowledge may overlap in TKDL?' },
                { label: 'AYUSH Rules', query: 'What AYUSH licensing regulations apply?' },
                { label: 'Biodiversity', query: 'Does biodiversity regulation (NBA) apply?' },
                { label: 'International', query: 'What international dietary supplement rules apply?' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(item.query)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#FAF4EB] dark:bg-[#1A0C09] hover:bg-[#8E241C] text-[#3A160F] dark:text-[#E8D8C3] hover:text-[#FFF7EC] dark:hover:text-[#FFF7EC] border border-[#D8C2A0] dark:border-[#3E1E17] hover:border-[#8E241C] transition-colors text-[11px]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#FAF4EB] to-[#F5E8D2]/60 dark:from-[#1E0F0B] dark:to-[#160A07]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#8E241C] text-[#FFF7EC] rounded-tr-none shadow-sm'
                        : 'bg-[#FFFDF9] dark:bg-[#25120E] text-[#2B1A14] dark:text-[#E8D8C3] rounded-tl-none border border-[#E6D3B3] dark:border-[#3E1E17] shadow-[0_2px_8px_rgba(43,26,20,0.06)]'
                    }`}
                  >
                    {/* Assistant Finding Badge */}
                    {msg.finding && (
                      <div className="mb-2 pb-1.5 border-b border-[#E6D3B3] dark:border-[#3E1E17] flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[#8E241C] dark:text-[#E2C78E] flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> Finding
                        </span>
                        <span className="text-[10px] bg-[#EFE0C5] dark:bg-[#3A160F] text-[#3A160F] dark:text-[#E8D8C3] px-1.5 py-0.5 rounded">
                          {msg.domain}
                        </span>
                      </div>
                    )}

                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Citations inside Assistant Response */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-[#E6D3B3] dark:border-[#3E1E17] space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#8E241C] dark:text-[#E2C78E] tracking-wider block">
                          Authoritative Statutory Sources:
                        </span>
                        {msg.citations.slice(0, 2).map((cit) => (
                          <div
                            key={cit.id}
                            className="bg-[#F6EFE3] dark:bg-[#1A0C09] rounded p-2 text-[11px] text-[#3A160F] dark:text-[#E8D8C3] border border-[#D8C2A0]/70 dark:border-[#3E1E17]"
                          >
                            <div className="flex items-center justify-between font-medium">
                              <span>{cit.authority} — {cit.section}</span>
                              <span className="text-[9px] bg-[#8E241C]/15 dark:bg-[#8E241C]/30 text-[#8E241C] dark:text-[#E2C78E] px-1 rounded">
                                {cit.evidenceStrength}
                              </span>
                            </div>
                            <p className="italic text-[#552D21] dark:text-[#C5A880] text-[10px] mt-1 line-clamp-2">
                              {cit.evidencePassage}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8C6D5F] dark:text-[#A89082] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 bg-[#EFE0C5]/60 dark:bg-[#2A140F] border-t border-[#D8C2A0] dark:border-[#3E1E17] flex items-center gap-2">
              <input
                id="chatbot-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about patents, TKDL, AYUSH, or biodiversity..."
                className="flex-1 bg-[#FFFDF9] dark:bg-[#1A0C09] border border-[#D8C2A0] dark:border-[#3E1E17] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#2B1A14] dark:text-[#E8D8C3] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C]"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="bg-[#8E241C] hover:bg-[#6F1D18] disabled:opacity-40 text-[#FFF7EC] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
