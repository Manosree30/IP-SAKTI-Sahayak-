import { IntelligenceReport, EvidenceItem, VerificationStatus } from '../types';
import { MOCK_HISTORY_DOSSIERS, BENCHMARK_DOSSIER } from '../data/mockIntelligenceData';

const STORAGE_KEYS = {
  DOSSIERS: 'ayurguard_dossiers_v3',
  ACTIVE_DOSSIER_ID: 'ayurguard_active_dossier_id_v3',
  SELECTED_EVIDENCE_ID: 'ayurguard_selected_evidence_id_v3',
  LANGUAGE: 'ayurguard_language_v2',
  THEME: 'ayurguard_theme_v2',
  RESPONSE_PREF: 'ayurguard_response_pref_v2',
};

/**
 * Clean storage persistence service for AyurGuard prototype.
 * All dossier mutations, evidence verification updates, and reviewer notes
 * are stored here and restored across browser refreshes.
 */
export const storageService = {
  loadDossiers(): IntelligenceReport[] {
    try {
      const serialized = localStorage.getItem(STORAGE_KEYS.DOSSIERS);
      if (!serialized) {
        // Seed with default history dossiers
        localStorage.setItem(STORAGE_KEYS.DOSSIERS, JSON.stringify(MOCK_HISTORY_DOSSIERS));
        return MOCK_HISTORY_DOSSIERS;
      }
      const parsed = JSON.parse(serialized);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
      return MOCK_HISTORY_DOSSIERS;
    } catch (e) {
      console.warn('[AyurGuard Storage] Failed to load dossiers from localStorage, falling back to mock data', e);
      return MOCK_HISTORY_DOSSIERS;
    }
  },

  saveDossiers(dossiers: IntelligenceReport[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DOSSIERS, JSON.stringify(dossiers));
    } catch (e) {
      console.error('[AyurGuard Storage] Failed to save dossiers to localStorage', e);
    }
  },

  loadActiveDossierId(): string {
    try {
      const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_DOSSIER_ID);
      if (id) return id;
    } catch (e) {
      // Fall through
    }
    return BENCHMARK_DOSSIER.id;
  },

  saveActiveDossierId(id: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DOSSIER_ID, id);
    } catch (e) {
      console.error('[AyurGuard Storage] Failed to save active dossier id', e);
    }
  },

  loadSelectedEvidenceId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.SELECTED_EVIDENCE_ID);
    } catch (e) {
      return null;
    }
  },

  saveSelectedEvidenceId(id: string | null): void {
    try {
      if (id) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_EVIDENCE_ID, id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_EVIDENCE_ID);
      }
    } catch (e) {
      console.error('[AyurGuard Storage] Failed to save selected evidence id', e);
    }
  },

  /**
   * Helper to find and update an evidence record across all sections in a dossier
   */
  updateEvidenceStatus(
    dossiers: IntelligenceReport[],
    dossierId: string,
    evidenceId: string,
    newStatus: VerificationStatus,
    notes?: string
  ): IntelligenceReport[] {
    const updated = dossiers.map((dossier) => {
      if (dossier.id !== dossierId) return dossier;

      const updateList = (list: EvidenceItem[]): EvidenceItem[] =>
        list.map((item) => {
          if (item.id !== evidenceId) return item;
          const updatedItem: EvidenceItem = {
            ...item,
            verificationStatus: newStatus,
            reviewedAt: new Date().toISOString(),
            verifiedDate: new Date().toISOString().split('T')[0],
          };
          if (notes !== undefined) {
            updatedItem.auditNotes = notes;
            updatedItem.reviewerNotes = notes;
          }
          return updatedItem;
        });

      const newSections = {
        ip: { ...dossier.sections.ip, evidence: updateList(dossier.sections.ip.evidence) },
        traditionalKnowledge: {
          ...dossier.sections.traditionalKnowledge,
          evidence: updateList(dossier.sections.traditionalKnowledge.evidence),
        },
        ayushRegulatory: {
          ...dossier.sections.ayushRegulatory,
          evidence: updateList(dossier.sections.ayushRegulatory.evidence),
        },
        biodiversity: {
          ...dossier.sections.biodiversity,
          evidence: updateList(dossier.sections.biodiversity.evidence),
        },
        international: {
          ...dossier.sections.international,
          evidence: updateList(dossier.sections.international.evidence),
        },
      };

      // Recalculate audit trail counts dynamically
      const allEv: EvidenceItem[] = [
        ...newSections.ip.evidence,
        ...newSections.traditionalKnowledge.evidence,
        ...newSections.ayushRegulatory.evidence,
        ...newSections.biodiversity.evidence,
        ...newSections.international.evidence,
      ];

      const verifiedCount = allEv.filter((e) => e.verificationStatus === 'Verified').length;
      const reviewCount = allEv.filter((e) => e.verificationStatus === 'Requires Review').length;
      const flaggedCount = allEv.filter((e) => e.verificationStatus === 'Flagged Discrepancy').length;

      return {
        ...dossier,
        sections: newSections,
        auditTrails: {
          ...dossier.auditTrails,
          supportedClaimsCount: verifiedCount,
          requiresReviewCount: reviewCount,
          flaggedCount,
          humanAudited: true,
          auditedBy: dossier.auditTrails?.auditedBy || 'Human Reviewer',
          auditTimestamp: new Date().toISOString(),
        },
      };
    });

    this.saveDossiers(updated);
    return updated;
  },

  deleteDossier(
    dossiers: IntelligenceReport[],
    targetId: string,
    currentActiveId: string
  ): { updatedDossiers: IntelligenceReport[]; nextActiveId: string } {
    const updatedDossiers = dossiers.filter((d) => d.id !== targetId);
    let nextActiveId = currentActiveId;

    if (currentActiveId === targetId) {
      nextActiveId = updatedDossiers.length > 0 ? updatedDossiers[0].id : BENCHMARK_DOSSIER.id;
      this.saveActiveDossierId(nextActiveId);
    }

    this.saveDossiers(updatedDossiers);
    return { updatedDossiers, nextActiveId };
  },

  addDossier(dossiers: IntelligenceReport[], newDossier: IntelligenceReport): IntelligenceReport[] {
    // Avoid duplicate IDs
    const filtered = dossiers.filter((d) => d.id !== newDossier.id);
    const updated = [newDossier, ...filtered];
    this.saveDossiers(updated);
    this.saveActiveDossierId(newDossier.id);
    return updated;
  },
};
