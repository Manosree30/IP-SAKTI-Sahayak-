import React, { useState, useMemo } from 'react';
import { Screen, Language, IntelligenceReport } from '../types';
import { translations } from '../i18n/translations';
import { useDossier } from '../context/DossierContext';
import { 
  Search, 
  Trash2, 
  Eye, 
  Filter, 
  ArrowUpDown, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  X, 
  ShieldAlert,
  Archive,
  AlertCircle
} from 'lucide-react';

interface HistoryViewProps {
  setScreen: (screen: Screen) => void;
  language: Language;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  setScreen,
  language,
}) => {
  const t = translations[language];
  const { dossiers, setActiveDossierId, deleteDossier } = useDossier();

  // Search, Filter, and Sort state
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'product' | 'query'>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest_risk' | 'lowest_risk' | 'most_evidence' | 'recently_reviewed'>('newest');

  // Deletion modal state
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Dynamic Archive Metrics
  const totalAssessments = dossiers.length;
  const productInvestigationsCount = useMemo(
    () => dossiers.filter((d) => d.isProductAnalysis).length,
    [dossiers]
  );
  const researchQueriesCount = useMemo(
    () => dossiers.filter((d) => !d.isProductAnalysis).length,
    [dossiers]
  );
  const requiresReviewAssessmentsCount = useMemo(
    () => dossiers.filter((d) => (d.auditTrails?.requiresReviewCount || 0) > 0).length,
    [dossiers]
  );

  // Helper to extract risk weight for sorting
  const getRiskWeight = (riskLevel: string): number => {
    const r = riskLevel.toLowerCase();
    if (r.includes('critical')) return 4;
    if (r.includes('high')) return 3;
    if (r.includes('moderate')) return 2;
    return 1;
  };

  // Helper to get total evidence items in a dossier
  const getEvidenceCount = (dossier: IntelligenceReport): number => {
    if (!dossier.sections) return 0;
    return (
      (dossier.sections.ip?.evidence?.length || 0) +
      (dossier.sections.traditionalKnowledge?.evidence?.length || 0) +
      (dossier.sections.ayushRegulatory?.evidence?.length || 0) +
      (dossier.sections.biodiversity?.evidence?.length || 0) +
      (dossier.sections.international?.evidence?.length || 0)
    );
  };

  // Filter & Search Logic
  const filteredDossiers = useMemo(() => {
    return dossiers.filter((d) => {
      // Type Filter
      if (typeFilter === 'product' && !d.isProductAnalysis) return false;
      if (typeFilter === 'query' && d.isProductAnalysis) return false;

      // Risk Filter
      if (riskFilter !== 'all') {
        const risk = d.executiveFinding.riskLevel.toLowerCase();
        if (riskFilter === 'low' && !risk.includes('low')) return false;
        if (riskFilter === 'moderate' && !risk.includes('moderate')) return false;
        if (riskFilter === 'high' && !risk.includes('high')) return false;
        if (riskFilter === 'critical' && (!risk.includes('critical') && !risk.includes('conflict'))) return false;
      }

      // Verification Filter
      if (verificationFilter !== 'all') {
        const hasRequiresReview = (d.auditTrails?.requiresReviewCount || 0) > 0;
        const hasFlagged = (d.auditTrails?.flaggedCount || 0) > 0;
        if (verificationFilter === 'verified' && (hasRequiresReview || hasFlagged)) return false;
        if (verificationFilter === 'requires_review' && !hasRequiresReview) return false;
        if (verificationFilter === 'flagged' && !hasFlagged) return false;
      }

      // Jurisdiction Filter
      if (jurisdictionFilter !== 'all') {
        const j = jurisdictionFilter.toLowerCase();
        const target = (d.productDetails?.targetCountry || '').toLowerCase();
        const statutes = (d.executiveFinding.primaryStatutes || []).join(' ').toLowerCase();
        if (!target.includes(j) && !statutes.includes(j)) return false;
      }

      // Search Query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesId = d.id.toLowerCase().includes(q);
        const matchesTitle = d.title.toLowerCase().includes(q);
        const matchesProduct = (d.productDetails?.productName || '').toLowerCase().includes(q);
        const matchesQuery = d.queryOrProduct.toLowerCase().includes(q);
        const matchesIngredients = (d.productDetails?.ingredients || []).join(' ').toLowerCase().includes(q);
        const matchesJurisdiction = (d.productDetails?.targetCountry || '').toLowerCase().includes(q);
        return matchesId || matchesTitle || matchesProduct || matchesQuery || matchesIngredients || matchesJurisdiction;
      }

      return true;
    });
  }, [dossiers, search, typeFilter, riskFilter, verificationFilter, jurisdictionFilter]);

  // Sort Logic
  const sortedDossiers = useMemo(() => {
    const list = [...filteredDossiers];
    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      case 'oldest':
        return list.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      case 'highest_risk':
        return list.sort(
          (a, b) => getRiskWeight(b.executiveFinding.riskLevel) - getRiskWeight(a.executiveFinding.riskLevel)
        );
      case 'lowest_risk':
        return list.sort(
          (a, b) => getRiskWeight(a.executiveFinding.riskLevel) - getRiskWeight(b.executiveFinding.riskLevel)
        );
      case 'most_evidence':
        return list.sort((a, b) => getEvidenceCount(b) - getEvidenceCount(a));
      case 'recently_reviewed':
        return list.sort((a, b) => {
          const timeA = a.auditTrails?.auditTimestamp ? new Date(a.auditTrails.auditTimestamp).getTime() : 0;
          const timeB = b.auditTrails?.auditTimestamp ? new Date(b.auditTrails.auditTimestamp).getTime() : 0;
          return timeB - timeA;
        });
      default:
        return list;
    }
  }, [filteredDossiers, sortBy]);

  const handleInspect = (id: string) => {
    setActiveDossierId(id);
    setScreen('intelligence_report');
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      deleteDossier(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setRiskFilter('all');
    setVerificationFilter('all');
    setJurisdictionFilter('all');
    setSortBy('newest');
  };

  return (
    <div id="history-view-root" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-7">
      {/* Header */}
      <div className="border-b border-[#E2DDD1] dark:border-[#24352C] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-[#8C6D3B]"></span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8C6D3B] font-bold">
              {t.history.badge}
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F35] dark:text-[#EFECE6]">
            {t.history.title}
          </h1>
          <p className="text-sm text-[#526058] dark:text-[#BAC7C0] mt-1">
            {t.history.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setScreen('product_analysis')}
          className="px-4 py-2 bg-[#173F35] dark:bg-[#759A84] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs uppercase font-bold hover:bg-[#102E26] transition-colors self-start sm:self-auto shadow-xs"
        >
          {t.history.newInvestigation}
        </button>
      </div>

      {/* Dynamic Archive Status Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#24352C] p-3.5 tech-box shadow-xs">
          <div className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#8D9E96] font-bold">
            {t.history.totalAssessments}
          </div>
          <div className="font-mono text-2xl font-bold text-[#173F35] dark:text-[#EFECE6] mt-1">
            {totalAssessments}
          </div>
          <div className="font-mono text-[10px] text-[#6A7870] dark:text-[#8D9E96] mt-0.5">
            Active in local archive
          </div>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#24352C] p-3.5 tech-box shadow-xs">
          <div className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#8D9E96] font-bold">
            {t.history.productInvestigations}
          </div>
          <div className="font-mono text-2xl font-bold text-[#173F35] dark:text-[#EFECE6] mt-1">
            {productInvestigationsCount}
          </div>
          <div className="font-mono text-[10px] text-[#6A7870] dark:text-[#8D9E96] mt-0.5">
            Commercial formulations
          </div>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#24352C] p-3.5 tech-box shadow-xs">
          <div className="font-mono text-[10px] uppercase text-[#6A7870] dark:text-[#8D9E96] font-bold">
            {t.history.researchQueries}
          </div>
          <div className="font-mono text-2xl font-bold text-[#173F35] dark:text-[#EFECE6] mt-1">
            {researchQueriesCount}
          </div>
          <div className="font-mono text-[10px] text-[#6A7870] dark:text-[#8D9E96] mt-0.5">
            Hypothesis &amp; patent questions
          </div>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#24352C] p-3.5 tech-box shadow-xs">
          <div className="font-mono text-[10px] uppercase text-[#8C6D3B] dark:text-[#E8CA89] font-bold">
            {t.history.requiresReviewCount}
          </div>
          <div className="font-mono text-2xl font-bold text-[#8C6D3B] dark:text-[#E8CA89] mt-1">
            {requiresReviewAssessmentsCount}
          </div>
          <div className="font-mono text-[10px] text-[#6A7870] dark:text-[#8D9E96] mt-0.5">
            Pending counsel resolution
          </div>
        </div>
      </div>

      {/* Filter & Search Console */}
      <div className="bg-[#FFFFFF] dark:bg-[#0E1712] border border-[#E2DDD1] dark:border-[#24352C] p-4 tech-box shadow-xs space-y-3">
        {/* Search Bar & Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#6A7870] absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.history.searchPlaceholder}
              className="w-full bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] pl-8 pr-3 py-2 text-xs text-[#1E2925] dark:text-[#EFECE6] focus:outline-none focus:border-[#173F35]"
            />
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="font-mono text-xs text-[#6A7870] dark:text-[#8D9E96] whitespace-nowrap">
              {t.history.sortLabel}:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FCFBF7] dark:bg-[#121B16] border border-[#DDD7C9] dark:border-[#25392D] px-2.5 py-1.5 text-xs text-[#173F35] dark:text-[#EFECE6] font-mono focus:outline-none focus:border-[#173F35]"
            >
              <option value="newest">{t.history.sortNewest}</option>
              <option value="oldest">{t.history.sortOldest}</option>
              <option value="highest_risk">{t.history.sortHighestRisk}</option>
              <option value="lowest_risk">{t.history.sortLowestRisk}</option>
              <option value="most_evidence">{t.history.sortMostEvidence}</option>
              <option value="recently_reviewed">{t.history.sortRecentlyReviewed}</option>
            </select>
          </div>
        </div>

        {/* Multi-Dimensional Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAE5DA] dark:border-[#1C2C23] text-xs font-mono">
          {/* Type Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[#6A7870] dark:text-[#8D9E96] text-[11px] mr-1">{t.history.filterType}:</span>
            <button
              type="button"
              onClick={() => setTypeFilter('all')}
              className={`px-2 py-0.5 border ${
                typeFilter === 'all'
                  ? 'bg-[#173F35] text-[#FAF8F5] border-[#173F35] font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C]'
              }`}
            >
              {t.common.all}
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('product')}
              className={`px-2 py-0.5 border ${
                typeFilter === 'product'
                  ? 'bg-[#173F35] text-[#FAF8F5] border-[#173F35] font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C]'
              }`}
            >
              {t.history.typeProducts}
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter('query')}
              className={`px-2 py-0.5 border ${
                typeFilter === 'query'
                  ? 'bg-[#173F35] text-[#FAF8F5] border-[#173F35] font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C]'
              }`}
            >
              {t.history.typeQueries}
            </button>
          </div>

          <span className="text-[#DDD7C9] dark:text-[#283830] hidden md:inline">|</span>

          {/* Risk Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[#6A7870] dark:text-[#8D9E96] text-[11px] mr-1">{t.history.filterRisk}:</span>
            {['all', 'critical', 'high', 'moderate', 'low'].map((rf) => (
              <button
                key={rf}
                type="button"
                onClick={() => setRiskFilter(rf)}
                className={`px-2 py-0.5 border capitalize ${
                  riskFilter === rf
                    ? 'bg-[#173F35] text-[#FAF8F5] border-[#173F35] font-bold'
                    : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C]'
                }`}
              >
                {rf === 'all' ? t.common.all : rf}
              </button>
            ))}
          </div>

          <span className="text-[#DDD7C9] dark:text-[#283830] hidden md:inline">|</span>

          {/* Verification Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[#6A7870] dark:text-[#8D9E96] text-[11px] mr-1">{t.history.filterVerification}:</span>
            <button
              type="button"
              onClick={() => setVerificationFilter('all')}
              className={`px-2 py-0.5 border ${
                verificationFilter === 'all'
                  ? 'bg-[#173F35] text-[#FAF8F5] border-[#173F35] font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C]'
              }`}
            >
              {t.common.all}
            </button>
            <button
              type="button"
              onClick={() => setVerificationFilter('requires_review')}
              className={`px-2 py-0.5 border ${
                verificationFilter === 'requires_review'
                  ? 'bg-[#8C6D3B] text-[#FAF8F5] border-[#8C6D3B] font-bold'
                  : 'bg-[#FCFBF7] dark:bg-[#121B16] text-[#526058] dark:text-[#A7B8AF] border-[#DDD7C9] dark:border-[#24352C]'
              }`}
            >
              {t.history.verifReview}
            </button>
          </div>

          {(search || typeFilter !== 'all' || riskFilter !== 'all' || verificationFilter !== 'all' || jurisdictionFilter !== 'all') && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="ml-auto text-[11px] text-[#8C6D3B] hover:underline font-bold"
            >
              {t.history.clearFilters}
            </button>
          )}
        </div>
      </div>

      {/* Historical Dossiers Table */}
      <div className="border border-[#E2DDD1] dark:border-[#24352C] bg-[#FFFFFF] dark:bg-[#0E1712] tech-box shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#FCFBF7] dark:bg-[#142019] px-5 py-3 border-b border-[#E2DDD1] dark:border-[#1E2E25] hidden lg:grid grid-cols-12 gap-4 text-xs font-mono font-bold text-[#173F35] dark:text-[#8DA998] uppercase">
          <div className="col-span-2">{t.history.table.dossier}</div>
          <div className="col-span-3">{t.history.table.investigation}</div>
          <div className="col-span-2">{t.history.table.productOrQuery}</div>
          <div className="col-span-1">{t.history.table.date}</div>
          <div className="col-span-2">{t.history.table.riskLevel}</div>
          <div className="col-span-2 text-right">{t.history.table.actions}</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#EAE5DA] dark:divide-[#1C2C23]">
          {sortedDossiers.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Archive className="w-8 h-8 text-[#C8C0AF] dark:text-[#33463B] mx-auto" />
              <div className="font-serif text-base font-bold text-[#173F35] dark:text-[#EFECE6]">
                {t.history.emptyTitle}
              </div>
              <p className="text-xs font-mono text-[#6A7870] dark:text-[#85978E] max-w-sm mx-auto">
                {t.history.emptySubtitle}
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-1.5 bg-[#173F35] text-[#FAF8F5] dark:bg-[#759A84] dark:text-[#0C1310] font-mono text-xs font-bold hover:bg-[#102E26] transition-colors"
              >
                {t.history.clearFilters}
              </button>
            </div>
          ) : (
            sortedDossiers.map((dossier) => {
              const evidenceTotal = getEvidenceCount(dossier);
              const isReviewPending = (dossier.auditTrails?.requiresReviewCount || 0) > 0;
              const isCriticalRisk = dossier.executiveFinding.riskLevel.toLowerCase().includes('critical') ||
                                    dossier.executiveFinding.riskLevel.toLowerCase().includes('conflict');
              const isHighRisk = dossier.executiveFinding.riskLevel.toLowerCase().includes('high');

              return (
                <div
                  key={dossier.id}
                  className="p-4 sm:p-5 hover:bg-[#FCFBF7] dark:hover:bg-[#121E17] transition-colors grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center"
                >
                  {/* ID & Type Badge */}
                  <div className="lg:col-span-2 space-y-1">
                    <div className="font-mono text-xs font-bold text-[#8C6D3B]">
                      {dossier.id}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] uppercase font-semibold px-1.5 py-0.5 bg-[#F4EFE6] dark:bg-[#1B2821] text-[#526058] dark:text-[#BAC7C0] border border-[#DDD7C9] dark:border-[#283830]">
                        {dossier.isProductAnalysis ? 'Formulation' : 'Research Query'}
                      </span>
                    </div>
                  </div>

                  {/* Investigation Title */}
                  <div className="lg:col-span-3 space-y-0.5">
                    <div className="font-serif text-sm font-bold text-[#173F35] dark:text-[#EFECE6] line-clamp-1">
                      {dossier.title}
                    </div>
                    <div className="font-mono text-[11px] text-[#6A7870] dark:text-[#85978E] truncate">
                      {dossier.productDetails?.targetCountry || 'India / International PCT'}
                    </div>
                  </div>

                  {/* Product or Query Details */}
                  <div className="lg:col-span-2 space-y-0.5">
                    <div className="text-xs text-[#1E2925] dark:text-[#EFECE6] font-medium line-clamp-1">
                      {dossier.productDetails?.productName || dossier.queryOrProduct}
                    </div>
                    <div className="font-mono text-[10px] text-[#8C6D3B]">
                      {evidenceTotal} Evidence Records
                    </div>
                  </div>

                  {/* Date */}
                  <div className="lg:col-span-1 font-mono text-[11px] text-[#6A7870] dark:text-[#85978E]">
                    {new Date(dossier.timestamp).toLocaleDateString()}
                  </div>

                  {/* Risk & Verification Status */}
                  <div className="lg:col-span-2 space-y-1">
                    <span
                      className={`inline-block font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${
                        isCriticalRisk
                          ? 'bg-[#FDF2F0] text-[#8B261E] border-[#F0BCB7] dark:bg-[#2F1A18] dark:text-[#F39F97]'
                          : isHighRisk
                          ? 'bg-[#FAF6EE] text-[#8C6D3B] border-[#E7D6B7] dark:bg-[#2A2315] dark:text-[#E8CA89]'
                          : 'bg-[#F2F7F4] text-[#1E5638] border-[#BDD7C7] dark:bg-[#163325] dark:text-[#9ECBB0]'
                      }`}
                    >
                      {dossier.executiveFinding.riskLevel}
                    </span>

                    {isReviewPending && (
                      <div className="font-mono text-[10px] text-[#8C6D3B] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{dossier.auditTrails.requiresReviewCount} requires review</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Inspect & Delete */}
                  <div className="lg:col-span-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleInspect(dossier.id)}
                      className="px-3 py-1.5 bg-[#173F35] dark:bg-[#759A84] text-[#FAF8F5] dark:text-[#0C1310] font-mono text-xs font-semibold hover:bg-[#102E26] transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.history.inspect}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPendingDeleteId(dossier.id)}
                      className="p-1.5 text-[#8B261E] hover:bg-[#FDF2F0] dark:hover:bg-[#2F1A18] border border-transparent hover:border-[#F0BCB7] transition-colors"
                      title={t.history.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Confirmation Modal for Dossier Deletion */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 bg-[#0C1310]/70 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] dark:bg-[#101A14] border border-[#E2DDD1] dark:border-[#283830] max-w-md w-full p-6 tech-box shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-[#8B261E]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold">
                {t.history.deleteModalTitle}
              </h3>
            </div>

            <p className="text-xs text-[#526058] dark:text-[#BAC7C0] leading-relaxed">
              {t.history.deleteModalMessage}
            </p>

            <div className="bg-[#FCFBF7] dark:bg-[#142019] p-3 border border-[#E2DDD1] dark:border-[#25392D] font-mono text-xs text-[#173F35] dark:text-[#8DA998] font-bold">
              ID: {pendingDeleteId}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPendingDeleteId(null)}
                className="px-4 py-1.5 border border-[#DDD7C9] dark:border-[#283830] text-xs font-mono text-[#526058] dark:text-[#BAC7C0] hover:bg-[#F7F5EF] transition-colors"
              >
                {t.common.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-[#8B261E] text-[#FAF8F5] text-xs font-mono font-bold hover:bg-[#721C16] transition-colors shadow-xs"
              >
                {t.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
