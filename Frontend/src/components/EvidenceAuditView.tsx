import React, { useState, useMemo, useEffect } from 'react';
import { Screen, Language, EvidenceItem, VerificationStatus } from '../types';
import { translations } from '../i18n/translations';
import { useDossier } from '../context/DossierContext';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  ArrowRight, 
  Check, 
  Clock, 
  Scale, 
  FileCheck2, 
  Search,
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface EvidenceAuditViewProps {
  setScreen: (screen: Screen) => void;
  language: Language;
}

export const EvidenceAuditView: React.FC<EvidenceAuditViewProps> = ({
  setScreen,
  language,
}) => {
  const t = translations[language];
  const { 
    activeDossier, 
    allActiveEvidence, 
    selectedEvidenceId, 
    setSelectedEvidenceId, 
    updateEvidenceStatus 
  } = useDossier();

  // Filter state
  const [filter, setFilter] = useState<'all' | 'verified' | 'requires_review' | 'flagged'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  // Derive dynamic counts
  const totalCount = allActiveEvidence.length;
  const verifiedCount = useMemo(
    () => allActiveEvidence.filter((e) => e.verificationStatus === 'Verified').length,
    [allActiveEvidence]
  );
  const requiresReviewCount = useMemo(
    () => allActiveEvidence.filter((e) => e.verificationStatus === 'Requires Review').length,
    [allActiveEvidence]
  );
  const flaggedCount = useMemo(
    () => allActiveEvidence.filter((e) => e.verificationStatus === 'Flagged Discrepancy').length,
    [allActiveEvidence]
  );

  // Proportions for distribution bar
  const verifiedPct = totalCount > 0 ? (verifiedCount / totalCount) * 100 : 0;
  const reviewPct = totalCount > 0 ? (requiresReviewCount / totalCount) * 100 : 0;
  const flaggedPct = totalCount > 0 ? (flaggedCount / totalCount) * 100 : 0;

  // Filtered evidence items
  const filteredEvidence = useMemo(() => {
    return allActiveEvidence.filter((item) => {
      // Status filter
      if (filter === 'verified' && item.verificationStatus !== 'Verified') return false;
      if (filter === 'requires_review' && item.verificationStatus !== 'Requires Review') return false;
      if (filter === 'flagged' && item.verificationStatus !== 'Flagged Discrepancy') return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesDoc = item.document.toLowerCase().includes(q);
        const matchesClaim = item.claim.toLowerCase().includes(q);
        const matchesSource = item.source.toLowerCase().includes(q);
        const matchesSection = item.section.toLowerCase().includes(q);
        return matchesId || matchesDoc || matchesClaim || matchesSource || matchesSection;
      }
      return true;
    });
  }, [allActiveEvidence, filter, searchQuery]);

  // Derive active evidence item directly from fresh allActiveEvidence
  const activeItem = useMemo(() => {
    if (selectedEvidenceId) {
      const found = allActiveEvidence.find((e) => e.id === selectedEvidenceId);
      if (found) return found;
    }
    return filteredEvidence[0] || allActiveEvidence[0] || null;
  }, [allActiveEvidence, selectedEvidenceId, filteredEvidence]);

  // Reviewer notes state bound to current activeItem
  const [reviewerNotes, setReviewerNotes] = useState<string>('');

  useEffect(() => {
    if (activeItem) {
      setReviewerNotes(activeItem.reviewerNotes || activeItem.auditNotes || '');
    }
  }, [activeItem?.id, activeItem?.reviewerNotes, activeItem?.auditNotes]);

  const handleSelectEvidence = (item: EvidenceItem) => {
    setSelectedEvidenceId(item.id);
  };

  const handleStatusChange = (newStatus: VerificationStatus) => {
    if (!activeItem) return;
    updateEvidenceStatus(activeItem.id, newStatus, reviewerNotes);
    const label = newStatus === 'Verified' 
      ? (t.evidenceReview?.verified || 'Verified')
      : newStatus === 'Requires Review' 
      ? (t.evidenceReview?.requiresReview || 'Requires Review') 
      : (t.evidenceReview?.flagged || 'Flagged');
    setSavedNotification(`${label}: ${t.evidenceReview?.reviewSaved || 'Status updated'}`);
    setTimeout(() => setSavedNotification(null), 2500);
  };

  const handleSaveReview = () => {
    if (!activeItem) return;
    updateEvidenceStatus(activeItem.id, activeItem.verificationStatus, reviewerNotes);
    setSavedNotification(t.evidenceReview?.reviewSaved || 'Review saved successfully');
    setTimeout(() => setSavedNotification(null), 2500);
  };

  // Build the clean SOURCE TRACE string requested in the layout
  const sourceTraceString = useMemo(() => {
    if (!activeItem) return '';
    return `${activeItem.source} → ${activeItem.document} → ${activeItem.section}`;
  }, [activeItem]);

  return (
    <div id="evidence-audit-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between border-b border-[#E2DDD1] dark:border-[#1E2E25] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#6A7870] dark:text-[#8D9E96]">
          <span className="font-bold text-[#173F35] dark:text-[#9ECBB0]">AYURGUARD</span>
          <span>/</span>
          <span>{t.sidebar?.evidence || 'EVIDENCE'}</span>
          <span>/</span>
          <span className="text-[#8C6D3B] font-bold">{t.sidebar?.audit || 'AUDIT'}</span>
          <span>·</span>
          <span className="text-[#173F35] dark:text-[#BAC7C0]">{activeDossier.id}</span>
        </div>

        <button
          type="button"
          onClick={() => setScreen('intelligence_report')}
          className="px-3.5 py-1.5 bg-[#FFFFFF] dark:bg-[#121B16] text-[#173F35] dark:text-[#8DA998] font-mono text-xs font-semibold border border-[#DDD7C9] dark:border-[#263C2E] hover:bg-[#F7F5EF] dark:hover:bg-[#1C2C22] transition-colors shadow-xs flex items-center gap-1.5"
        >
          {t.audit.returnToDossier}
        </button>
      </div>

      {/* Primary Header - Exact Wireframe Spec */}
      <div className="space-y-1">
        <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#173F35] dark:text-[#EFECE6] uppercase">
          {t.evidenceReview?.title || 'EVIDENCE REVIEW'}
        </div>
        <div className="font-mono text-xs sm:text-sm text-[#6A7870] dark:text-[#9EB0A7]">
          {t.evidenceReview?.subtitle || 'Verification workspace'}
        </div>
      </div>

      {/* Subheader: {count} records requiring structured review + Divider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#173F35] dark:text-[#BAC7C0]">
          <span className="font-bold">
            {totalCount} {t.evidenceReview?.recordsRequiringReview || 'records requiring structured review'}
          </span>
          <span className="text-[11px] text-[#6A7870] dark:text-[#7A8C83]">
            {verifiedCount} Verified · {requiresReviewCount} Requires Review · {flaggedCount} Flagged
          </span>
        </div>
        {/* Crisp Industrial Divider */}
        <div className="w-full border-t-2 border-[#173F35] dark:border-[#2D4537]"></div>
      </div>

      {/* Main Dual-Panel Workspace: Record Selector (5 cols) & Active Review Console (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: 24 Records Registry Index */}
        <div className="lg:col-span-5 space-y-3">
          {/* Quick Filter Tabs & Search */}
          <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#1E2E25] p-3 space-y-2.5 shadow-xs">
            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 border transition-colors shrink-0 ${
                  filter === 'all'
                    ? 'bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] border-[#173F35] font-bold'
                    : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('verified')}
                className={`px-2.5 py-1 border transition-colors shrink-0 ${
                  filter === 'verified'
                    ? 'bg-[#1E5638] text-[#FAF8F5] dark:bg-[#68B887] dark:text-[#0C1310] border-[#1E5638] font-bold'
                    : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
                }`}
              >
                Verified ({verifiedCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('requires_review')}
                className={`px-2.5 py-1 border transition-colors shrink-0 ${
                  filter === 'requires_review'
                    ? 'bg-[#8C6D3B] text-[#FAF8F5] dark:bg-[#D4A759] dark:text-[#0C1310] border-[#8C6D3B] font-bold'
                    : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
                }`}
              >
                Requires Review ({requiresReviewCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('flagged')}
                className={`px-2.5 py-1 border transition-colors shrink-0 ${
                  filter === 'flagged'
                    ? 'bg-[#8B261E] text-[#FAF8F5] dark:bg-[#D46E65] dark:text-[#0C1310] border-[#8B261E] font-bold'
                    : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C] hover:bg-[#F7F5EF]'
                }`}
              >
                Flagged ({flaggedCount})
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#6A7870] absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search evidence records, citations, or sections..."
                className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] pl-8 pr-3 py-1.5 text-xs text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35]"
              />
            </div>
          </div>

          {/* Scrollable Records Ledger */}
          <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#1E2E25] divide-y divide-[#EAE5DA] dark:divide-[#1C2C23] max-h-[640px] overflow-y-auto shadow-xs">
            {filteredEvidence.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-[#6A7870] dark:text-[#8D9E96]">
                {t.audit.emptyFilterMessage}
              </div>
            ) : (
              filteredEvidence.map((item, index) => {
                const isSelected = activeItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectEvidence(item)}
                    className={`p-3.5 cursor-pointer transition-colors relative ${
                      isSelected
                        ? 'bg-[#F4EFE6] dark:bg-[#192720] border-l-4 border-[#8C6D3B]'
                        : 'hover:bg-[#FCFBF7] dark:hover:bg-[#131E18]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-[11px] font-bold text-[#173F35] dark:text-[#8DA998] flex items-center gap-1.5">
                        <span className="text-[#8C6D3B]">#{index + 1}</span>
                        <span>{item.id.toUpperCase()}</span>
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase font-semibold px-2 py-0.5 border ${
                          item.verificationStatus === 'Verified'
                            ? 'bg-[#F2F7F4] text-[#1E5638] border-[#BDD7C7] dark:bg-[#163325] dark:text-[#9ECBB0]'
                            : item.verificationStatus === 'Requires Review'
                            ? 'bg-[#FAF6EE] text-[#8C6D3B] border-[#E7D6B7] dark:bg-[#2A2315] dark:text-[#E8CA89]'
                            : 'bg-[#FDF2F0] text-[#8B261E] border-[#F0BCB7] dark:bg-[#2F1A18] dark:text-[#F39F97]'
                        }`}
                      >
                        {item.verificationStatus}
                      </span>
                    </div>

                    <div className="font-serif text-xs font-bold text-[#173F35] dark:text-[#EFECE6] line-clamp-1 mt-0.5">
                      {item.document}
                    </div>

                    <div className="text-xs text-[#526058] dark:text-[#BAC7C0] mt-1 line-clamp-2 italic">
                      "{item.claim}"
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-[#EAE5DA]/60 dark:border-[#1C2C23] flex items-center justify-between text-[10px] font-mono text-[#6A7870] dark:text-[#8D9E96]">
                      <span className="truncate max-w-[170px]">{item.source}</span>
                      <span className="text-[#8C6D3B] font-semibold">{item.section}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT PANEL: The Exact Verification Workspace Layout Requested */}
        <div className="lg:col-span-7 space-y-6">
          {activeItem ? (
            <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border-2 border-[#173F35] dark:border-[#2D4537] p-6 sm:p-7 space-y-6 shadow-sm">
              {/* Notification Banner */}
              {savedNotification && (
                <div className="bg-[#F2F7F4] dark:bg-[#163325] text-[#1E5638] dark:text-[#8DD4A9] border border-[#BDD7C7] dark:border-[#224A35] px-3.5 py-2 font-mono text-xs flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1E5638] dark:text-[#8DD4A9]" />
                  <span>{savedNotification}</span>
                </div>
              )}

              {/* 1. CLAIM Section */}
              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold tracking-wider text-[#6A7870] dark:text-[#8D9E96] uppercase">
                  {t.evidenceReview?.claim || 'CLAIM'}
                </div>
                <div className="text-base sm:text-lg font-serif font-bold text-[#173F35] dark:text-[#EFECE6] bg-[#FCFBF7] dark:bg-[#131E18] p-4 border border-[#E2DDD1] dark:border-[#1E2E25] leading-snug">
                  {activeItem.claim}
                </div>
              </div>

              {/* 2. SOURCE TRACE Section */}
              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold tracking-wider text-[#6A7870] dark:text-[#8D9E96] uppercase">
                  {t.evidenceReview?.sourceTrace || 'SOURCE TRACE'}
                </div>
                <div className="font-mono text-xs sm:text-sm text-[#8C6D3B] dark:text-[#E8CA89] font-bold bg-[#FAF8F3] dark:bg-[#152019] p-3.5 border border-[#E2DDD1] dark:border-[#1E2E25] flex items-center gap-2 flex-wrap">
                  <span className="text-[#173F35] dark:text-[#9ECBB0]">{activeItem.source}</span>
                  <span className="text-[#8C6D3B]">→</span>
                  <span className="text-[#3A4A40] dark:text-[#D5DDD8]">{activeItem.document}</span>
                  <span className="text-[#8C6D3B]">→</span>
                  <span className="text-[#8C6D3B] underline underline-offset-2">{activeItem.section}</span>
                </div>
              </div>

              {/* 3. EVIDENCE Section */}
              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold tracking-wider text-[#6A7870] dark:text-[#8D9E96] uppercase">
                  {t.evidenceReview?.evidence || 'EVIDENCE'}
                </div>
                <div className="relative">
                  <blockquote className="p-4 sm:p-5 bg-[#FCFBF7] dark:bg-[#142019] border-l-4 border-[#173F35] dark:border-[#759A84] font-serif italic text-sm sm:text-base text-[#1E2925] dark:text-[#D5DDD8] leading-relaxed border border-[#E2DDD1] dark:border-[#223329]">
                    "{activeItem.evidencePassage}"
                  </blockquote>
                </div>
              </div>

              {/* 4. VERIFICATION Radio Controls - Exact Visual Spec */}
              <div className="space-y-2 pt-1 border-t border-[#EAE5DA] dark:border-[#1C2C23]">
                <div className="font-mono text-xs font-bold tracking-wider text-[#6A7870] dark:text-[#8D9E96] uppercase">
                  {t.evidenceReview?.verification || 'VERIFICATION'}
                </div>

                <div className="space-y-2.5 font-mono text-sm">
                  {/* Option 1: Verified */}
                  <label
                    onClick={() => handleStatusChange('Verified')}
                    className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                      activeItem.verificationStatus === 'Verified'
                        ? 'bg-[#F2F7F4] dark:bg-[#163325] border-[#1E5638] text-[#1E5638] dark:text-[#8DD4A9] font-bold shadow-xs'
                        : 'bg-[#FCFBF7] dark:bg-[#131E18] border-[#DDD7C9] dark:border-[#223329] text-[#526058] dark:text-[#BAC7C0] hover:bg-[#F7F5EF]'
                    }`}
                  >
                    <span className="text-base leading-none">
                      {activeItem.verificationStatus === 'Verified' ? '●' : '○'}
                    </span>
                    <span>{t.evidenceReview?.verified || 'Verified'}</span>
                  </label>

                  {/* Option 2: Requires Review */}
                  <label
                    onClick={() => handleStatusChange('Requires Review')}
                    className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                      activeItem.verificationStatus === 'Requires Review'
                        ? 'bg-[#FAF6EE] dark:bg-[#282114] border-[#8C6D3B] text-[#8C6D3B] dark:text-[#E8CA89] font-bold shadow-xs'
                        : 'bg-[#FCFBF7] dark:bg-[#131E18] border-[#DDD7C9] dark:border-[#223329] text-[#526058] dark:text-[#BAC7C0] hover:bg-[#F7F5EF]'
                    }`}
                  >
                    <span className="text-base leading-none">
                      {activeItem.verificationStatus === 'Requires Review' ? '●' : '○'}
                    </span>
                    <span>{t.evidenceReview?.requiresReview || 'Requires Review'}</span>
                  </label>

                  {/* Option 3: Flagged */}
                  <label
                    onClick={() => handleStatusChange('Flagged Discrepancy')}
                    className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${
                      activeItem.verificationStatus === 'Flagged Discrepancy'
                        ? 'bg-[#FDF2F0] dark:bg-[#2F1A18] border-[#8B261E] text-[#8B261E] dark:text-[#F39F97] font-bold shadow-xs'
                        : 'bg-[#FCFBF7] dark:bg-[#131E18] border-[#DDD7C9] dark:border-[#223329] text-[#526058] dark:text-[#BAC7C0] hover:bg-[#F7F5EF]'
                    }`}
                  >
                    <span className="text-base leading-none">
                      {activeItem.verificationStatus === 'Flagged Discrepancy' ? '●' : '○'}
                    </span>
                    <span>{t.evidenceReview?.flagged || 'Flagged'}</span>
                  </label>
                </div>
              </div>

              {/* 5. REVIEW NOTE Section */}
              <div className="space-y-1.5 pt-1 border-t border-[#EAE5DA] dark:border-[#1C2C23]">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs font-bold tracking-wider text-[#6A7870] dark:text-[#8D9E96] uppercase">
                    {t.evidenceReview?.reviewNote || 'REVIEW NOTE'}
                  </div>
                  {activeItem.reviewedAt && (
                    <div className="font-mono text-[10px] text-[#8C6D3B]">
                      {t.audit.reviewedAt} {new Date(activeItem.reviewedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="[Enter reviewer notes, statutory observations, or prior art findings regarding this citation...]"
                  className="w-full bg-[#FCFBF7] dark:bg-[#131E18] border-2 border-[#DDD7C9] dark:border-[#25392D] p-3 text-xs sm:text-sm font-mono text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35] dark:focus:border-[#759A84]"
                />
              </div>

              {/* 6. [Save Review] Action Button */}
              <div className="pt-2 flex items-center justify-between">
                <div className="font-mono text-xs text-[#6A7870] dark:text-[#8D9E96]">
                  ID: <span className="font-bold text-[#173F35] dark:text-[#BAC7C0]">{activeItem.id.toUpperCase()}</span> · {activeItem.jurisdiction}
                </div>
                <button
                  type="button"
                  onClick={handleSaveReview}
                  className="px-6 py-2.5 bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0A120E] font-mono text-sm font-bold hover:bg-[#102E26] dark:hover:bg-[#88AF98] transition-colors shadow-xs"
                >
                  [{t.evidenceReview?.saveReview || 'Save Review'}]
                </button>
              </div>

              {/* Metadata Collapsible/Details Footer */}
              <div className="mt-4 pt-4 border-t border-[#EAE5DA] dark:border-[#1C2C23] grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono bg-[#FAF8F3] dark:bg-[#111A15] p-3">
                <div>
                  <span className="text-[#6A7870] dark:text-[#7A8C83] block uppercase text-[9px] font-bold">Authority Tier</span>
                  <span className="text-[#173F35] dark:text-[#BAC7C0] font-bold">{activeItem.authorityTier}</span>
                </div>
                <div>
                  <span className="text-[#6A7870] dark:text-[#7A8C83] block uppercase text-[9px] font-bold">Evidence Strength</span>
                  <span className="text-[#173F35] dark:text-[#BAC7C0] font-bold">{activeItem.evidenceStrength}</span>
                </div>
                <div>
                  <span className="text-[#6A7870] dark:text-[#7A8C83] block uppercase text-[9px] font-bold">Verified Date</span>
                  <span className="text-[#8C6D3B] font-bold">{activeItem.verifiedDate}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-[#E2DDD1] dark:border-[#1E2E25] bg-[#FFFFFF] dark:bg-[#0E1712] p-12 text-center text-xs font-mono text-[#6A7870] dark:text-[#85978E] shadow-xs">
              {t.audit.selectPrompt}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
