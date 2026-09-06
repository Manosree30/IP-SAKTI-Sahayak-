import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  BookOpen, 
  Filter, 
  Globe, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QUICK_QUESTIONS } from '../data/mockData';

export const AskAIPage: React.FC = () => {
  const { chatMessages, sendChatMessage, language } = useApp();
  const [inputVal, setInputVal] = useState('');
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [selectedCountry, setSelectedCountry] = useState('India');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    sendChatMessage(inputVal.trim(), selectedModule);
    setInputVal('');
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt, selectedModule);
  };

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="border-b border-[#E6D3B3] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold uppercase tracking-wider">
          <Bot className="w-3.5 h-3.5" />
          <span>Statutory Decision-Support Chat</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
          Ask AyurGuard AI
        </h1>
        <p className="text-xs sm:text-sm text-[#63483D]">
          Ask questions about Ayurveda patents, traditional knowledge (TKDL), AYUSH licensing, and biodiversity regulations.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#E0CFB3] shadow-xs flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-[#3A160F] font-semibold">
          <Filter className="w-3.5 h-3.5 text-[#8E241C]" />
          <span>Context Filters:</span>
        </div>

        {/* Module Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#8C6D5F]">Domain:</span>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-[#FAF4EB] border border-[#D8C2A0] rounded-lg px-2.5 py-1 text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
          >
            <option value="All Modules">All Domains</option>
            <option value="Patent">Patent & Prior Art</option>
            <option value="Traditional Knowledge">Traditional Knowledge (TKDL)</option>
            <option value="AYUSH Regulation">AYUSH Regulations (GMP)</option>
            <option value="Biodiversity">Biodiversity (NBA)</option>
            <option value="International">International (FDA/EU)</option>
          </select>
        </div>

        {/* Country Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#8C6D5F]">Country:</span>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-[#FAF4EB] border border-[#D8C2A0] rounded-lg px-2.5 py-1 text-[#3A160F] focus:outline-none focus:border-[#8E241C]"
          >
            <option value="India">India (Patent Act 1970 / AYUSH)</option>
            <option value="Global">Global / WIPO Standards</option>
            <option value="USA">United States (US FDA DSHEA)</option>
            <option value="EU">European Union (THMPD)</option>
          </select>
        </div>
      </div>

      {/* Popular Question Chips */}
      <div className="space-y-2">
        <span className="text-xs font-serif font-bold text-[#3A160F] block">
          Popular Inquiries:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            { q: 'Can this formulation be patented?', tag: 'Patent' },
            { q: 'How do I check traditional knowledge overlap?', tag: 'TKDL' },
            { q: 'What AYUSH regulations should I check?', tag: 'AYUSH' },
            { q: 'Does using an Indian medicinal plant create biodiversity requirements?', tag: 'Biodiversity' },
            { q: 'What should I consider before entering an international market?', tag: 'International' },
            { q: 'What qualifies as non-obvious synergy under Section 3(e)?', tag: 'Evidence' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(item.q)}
              className="p-3 rounded-xl bg-[#FFFDF9] hover:bg-[#FAF4EB] border border-[#E0CFB3] hover:border-[#8E241C] text-left transition-all text-xs text-[#3A160F] shadow-2xs flex flex-col justify-between group cursor-pointer"
            >
              <span className="font-medium group-hover:text-[#8E241C] transition-colors">
                &ldquo;{item.q}&rdquo;
              </span>
              <span className="text-[10px] text-[#8C6D5F] mt-2 font-mono uppercase">
                {item.tag} &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E0CFB3] shadow-sm space-y-5 min-h-[380px]">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#8E241C] text-white rounded-tr-none shadow-sm'
                  : 'bg-[#FAF4EB] text-[#2B1A14] rounded-tl-none border border-[#E0CFB3] shadow-2xs'
              }`}
            >
              {/* Finding Tag */}
              {msg.finding && (
                <div className="mb-3 pb-2 border-b border-[#E0CFB3] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8E241C] flex items-center gap-1.5 font-serif">
                    <ShieldAlert className="w-4 h-4" /> Finding: {msg.finding}
                  </span>
                  <span className="text-[10px] bg-[#EFE0C5] text-[#3A160F] px-2 py-0.5 rounded-full border border-[#D8C2A0]">
                    {msg.domain || 'Regulatory Intelligence'}
                  </span>
                </div>
              )}

              <p className={`whitespace-pre-line ${msg.sender === 'user' ? 'text-white' : 'text-[#2B1A14]'}`}>{msg.text}</p>

              {/* Citations Attached */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#E0CFB3] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E241C] block">
                    Authoritative Citations Grounding This Response:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {msg.citations.map((c) => (
                      <div
                        key={c.id}
                        className="bg-[#FFFDF9] rounded-xl p-3 border border-[#D8C2A0] text-xs text-[#3A160F] space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#8E241C]">{c.authority}</span>
                          <span className="text-[9px] bg-[#2E6B20]/15 text-[#2E6B20] px-1.5 py-0.5 rounded font-semibold">
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-[#3A160F]">{c.section}</p>
                        <p className="text-[10px] italic text-[#63483D] line-clamp-2">
                          {c.evidencePassage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <span className="text-[10px] text-[#8C6D5F] mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex items-center gap-3">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask any question about Ayurveda formulation IP, TKDL slokas, or AYUSH rules..."
          className="flex-1 px-4 py-3 bg-[#FFFDF9] border border-[#D8C2A0] rounded-2xl text-xs sm:text-sm text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none focus:border-[#8E241C] shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputVal.trim()}
          className="px-6 py-3 bg-[#8E241C] hover:bg-[#6F1D18] disabled:opacity-40 text-[#FFF7EC] rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
