import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { IntelligenceReport, EvidenceItem, VerificationStatus } from '../types';
import { storageService } from '../services/storage';

interface DossierContextType {
  dossiers: IntelligenceReport[];
  activeDossierId: string;
  activeDossier: IntelligenceReport;
  selectedEvidenceId: string | null;
  setActiveDossierId: (id: string) => void;
  setSelectedEvidenceId: (id: string | null) => void;
  updateEvidenceStatus: (evidenceId: string, newStatus: VerificationStatus, notes?: string) => void;
  createDossier: (dossier: IntelligenceReport) => void;
  deleteDossier: (id: string) => void;
  allActiveEvidence: EvidenceItem[];
  feedbackMessage: string | null;
  showFeedback: (msg: string) => void;
}

const DossierContext = createContext<DossierContextType | undefined>(undefined);

export const DossierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dossiers, setDossiers] = useState<IntelligenceReport[]>(() => storageService.loadDossiers());
  const [activeDossierId, setActiveDossierIdState] = useState<string>(() => storageService.loadActiveDossierId());
  const [selectedEvidenceId, setSelectedEvidenceIdState] = useState<string | null>(() =>
    storageService.loadSelectedEvidenceId()
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedbackMessage(msg);
    const timer = setTimeout(() => {
      setFeedbackMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const setActiveDossierId = useCallback((id: string) => {
    setActiveDossierIdState(id);
    storageService.saveActiveDossierId(id);
  }, []);

  const setSelectedEvidenceId = useCallback((id: string | null) => {
    setSelectedEvidenceIdState(id);
    storageService.saveSelectedEvidenceId(id);
  }, []);

  // Guarantee activeDossier is never null/undefined
  const activeDossier = useMemo(() => {
    const found = dossiers.find((d) => d.id === activeDossierId);
    if (found) return found;
    if (dossiers.length > 0) return dossiers[0];
    // Fallback if empty
    const fresh = storageService.loadDossiers();
    return fresh[0];
  }, [dossiers, activeDossierId]);

  // Flatten all evidence items for the active dossier
  const allActiveEvidence = useMemo(() => {
    if (!activeDossier || !activeDossier.sections) return [];
    return [
      ...(activeDossier.sections.ip?.evidence || []),
      ...(activeDossier.sections.traditionalKnowledge?.evidence || []),
      ...(activeDossier.sections.ayushRegulatory?.evidence || []),
      ...(activeDossier.sections.biodiversity?.evidence || []),
      ...(activeDossier.sections.international?.evidence || []),
    ];
  }, [activeDossier]);

  // Synchronize evidence update across state and localStorage
  const updateEvidenceStatus = useCallback(
    (evidenceId: string, newStatus: VerificationStatus, notes?: string) => {
      setDossiers((prevDossiers) => {
        const updated = storageService.updateEvidenceStatus(
          prevDossiers,
          activeDossierId,
          evidenceId,
          newStatus,
          notes
        );
        return updated;
      });
      showFeedback('Verification decision and reviewer record updated');
    },
    [activeDossierId, showFeedback]
  );

  const createDossier = useCallback(
    (newDossier: IntelligenceReport) => {
      setDossiers((prev) => {
        const updated = storageService.addDossier(prev, newDossier);
        return updated;
      });
      setActiveDossierId(newDossier.id);
      showFeedback(`Assessment ${newDossier.id} generated and archived`);
    },
    [setActiveDossierId, showFeedback]
  );

  const deleteDossier = useCallback(
    (targetId: string) => {
      setDossiers((prev) => {
        const { updatedDossiers, nextActiveId } = storageService.deleteDossier(prev, targetId, activeDossierId);
        setActiveDossierIdState(nextActiveId);
        return updatedDossiers;
      });
      showFeedback(`Assessment ${targetId} removed from archive`);
    },
    [activeDossierId, showFeedback]
  );

  // If selectedEvidenceId is not set or invalid, select the first available
  useEffect(() => {
    if (allActiveEvidence.length > 0) {
      if (!selectedEvidenceId || !allActiveEvidence.some((e) => e.id === selectedEvidenceId)) {
        setSelectedEvidenceId(allActiveEvidence[0].id);
      }
    }
  }, [allActiveEvidence, selectedEvidenceId, setSelectedEvidenceId]);

  const value = useMemo(
    () => ({
      dossiers,
      activeDossierId,
      activeDossier,
      selectedEvidenceId,
      setActiveDossierId,
      setSelectedEvidenceId,
      updateEvidenceStatus,
      createDossier,
      deleteDossier,
      allActiveEvidence,
      feedbackMessage,
      showFeedback,
    }),
    [
      dossiers,
      activeDossierId,
      activeDossier,
      selectedEvidenceId,
      setActiveDossierId,
      setSelectedEvidenceId,
      updateEvidenceStatus,
      createDossier,
      deleteDossier,
      allActiveEvidence,
      feedbackMessage,
      showFeedback,
    ]
  );

  return <DossierContext.Provider value={value}>{children}</DossierContext.Provider>;
};

export const useDossier = (): DossierContextType => {
  const context = useContext(DossierContext);
  if (!context) {
    throw new Error('useDossier must be used within a DossierProvider');
  }
  return context;
};
