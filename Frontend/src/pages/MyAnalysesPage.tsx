import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Plus, 
  Trash2, 
  Eye, 
  Calendar, 
  Layers, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyAnalysesPage: React.FC = () => {
  const { savedAnalyses, loadAnalysis, deleteAnalysis, setCurrentTab } = useApp();
  const [filterSearch, setFilterSearch] = useState('');

  const filteredAnalyses = savedAnalyses.filter((item) => {
    return (
      item.productName.toLowerCase().includes(filterSearch.toLowerCase()) ||
      item.purpose.toLowerCase().includes(filterSearch.toLowerCase()) ||
      item.overallStatus.toLowerCase().includes(filterSearch.toLowerCase())
    );
  });

  return (
    <div className="min-w-0 pb-20 px-4 sm:px-8 lg:px-12 pt-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#E6D3B3] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8E241C]/10 text-[#8E241C] text-xs font-semibold uppercase tracking-wider mb-1.5">
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Formulation Dossier Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A160F]">
            My Analyses
          </h1>
          <p className="text-xs sm:text-sm text-[#63483D]">
            Track previous patentability reviews, traditional knowledge clearances, and regulatory assessments.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab('analyze')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8E241C] hover:bg-[#6F1D18] text-[#FFF7EC] text-xs font-semibold shadow-sm transition-colors cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#FFFDF9] rounded-2xl p-4 border border-[#E0CFB3] shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-[#8C6D5F]" />
        <input
          type="text"
          value={filterSearch}
          onChange={(e) => setFilterSearch(e.target.value)}
          placeholder="Filter saved analyses by product name or status..."
          className="flex-1 bg-transparent text-xs sm:text-sm text-[#2B1A14] placeholder-[#8C6D5F]/60 focus:outline-none"
        />
        {filterSearch && (
          <button
            onClick={() => setFilterSearch('')}
            className="text-xs text-[#8E241C] hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Analyses Table */}
      <div className="bg-[#FFFDF9] rounded-3xl border border-[#E0CFB3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F6EFE3] text-[#3A160F] font-serif border-b border-[#E0CFB3]">
                <th className="py-4 px-5 font-bold">Product Name</th>
                <th className="py-4 px-4 font-bold">Date</th>
                <th className="py-4 px-4 font-bold">Domains Evaluated</th>
                <th className="py-4 px-4 font-bold">Status</th>
                <th className="py-4 px-4 font-bold">Evidence Strength</th>
                <th className="py-4 px-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE0D0] text-[#4A261B]">
              {filteredAnalyses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#8C6D5F]">
                    No formulations found. Click &ldquo;New Analysis&rdquo; to assess an Ayurveda formulation.
                  </td>
                </tr>
              ) : (
                filteredAnalyses.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF4EB] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-sm text-[#3A160F]">{item.productName}</div>
                      <div className="text-[11px] text-[#7A5B4C] line-clamp-1">{item.purpose}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-[#8C6D5F]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8E241C]" />
                        <span>{item.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {['Patent', 'TKDL', 'AYUSH'].map((m) => (
                          <span
                            key={m}
                            className="px-1.5 py-0.5 rounded bg-[#EFE0C5] text-[#3A160F] text-[10px] font-medium"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        item.overallStatus === 'Review Recommended' 
                          ? 'bg-[#8E241C]/10 text-[#8E241C] border border-[#8E241C]/25' 
                          : item.overallStatus === 'Assessment Available'
                            ? 'bg-[#2E6B20]/10 text-[#2E6B20] border border-[#2E6B20]/25'
                            : 'bg-[#B8955A]/20 text-[#6B4B18] border border-[#B8955A]/30'
                      }`}>
                        {item.overallStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-[#63483D]">
                      {item.overallConfidence}
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => loadAnalysis(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EFE0C5] hover:bg-[#8E241C] text-[#3A160F] hover:text-[#FFF7EC] font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => deleteAnalysis(item.id)}
                        className="p-1.5 rounded-lg text-[#8C6D5F] hover:text-[#8E241C] hover:bg-[#8E241C]/10 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
